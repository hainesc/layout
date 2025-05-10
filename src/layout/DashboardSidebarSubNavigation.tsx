"use client";
import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import type {} from "@mui/material/themeCssVarsAugmentation";
import type { Navigation, NavigationPageItem } from "./Navigation";
import {
  getItemPath,
  getItemTitle,
  hasSelectedNavigationChildren,
  isPageItem,
} from "./Navigation";
import {
  DashboardSidebarPageItemContext,
  NavigationContext,
} from "./LayoutContext";
import { getDrawerSxTransitionMixin } from "./utils";
import {
  DashboardSidebarPageItem,
  DashboardSidebarPageItemContextProps,
} from "./DashboardSidebarPageItem";
import { MINI_DRAWER_WIDTH } from "./shared";
import { alpha, useTheme } from "@mui/material";
import { useLocation } from "react-router";

interface DashboardSidebarSubNavigationPageItemProps {
  id: string;
  item: NavigationPageItem;
  isExpanded: boolean;
  onClick: (itemId: string, item: NavigationPageItem) => void;
  ensureExpand: (itemId: string, item: NavigationPageItem) => void;
  depth: number;
  onLinkClick: () => void;
  isMini: boolean;
  isFullyExpanded: boolean;
  isFullyCollapsed: boolean;
  sidebarExpandedWidth: number | string;
  renderPageItem?: (
    item: NavigationPageItem,
    params: { mini: boolean }
  ) => React.ReactNode;
}

/**
 * @ignore - internal component.
 */
function DashboardSidebarSubNavigationPageItem({
  id,
  item,
  isExpanded,
  onClick,
  ensureExpand,
  depth,
  onLinkClick,
  isMini,
  isFullyExpanded,
  isFullyCollapsed,
  sidebarExpandedWidth,
  renderPageItem,
}: DashboardSidebarSubNavigationPageItemProps) {
  const location = useLocation();
  // Show as selected in mini sidebar if any of the children matches path, otherwise show as selected if item matches path
  const isSelected = (function () {
    if (item.segment) {
      console.log(item.segment);
      // TODO: maybe should add / at segment, not here.
      const [path, hash] = ("/" + item.segment)?.split("#");
      if (location.pathname === path) {
        if (
          (!location.hash && !hash) ||
          location.hash.replace("#", "") === hash
        ) {
          return true;
        }
      }
      return false;
    }
    return false;
  })();

  const pageItemContextProps: DashboardSidebarPageItemContextProps =
    React.useMemo(
      () => ({
        expanded: isExpanded,
        selected: isSelected,
        id,
        onClick,
        ensureExpand,
        isMini,
        isSidebarFullyExpanded: isFullyExpanded,
        isSidebarFullyCollapsed: isFullyCollapsed,
        renderNestedNavigation: () => (
          <DashboardSidebarSubNavigation
            subNavigation={item.children ?? []}
            depth={depth + 1}
            onLinkClick={onLinkClick}
            isPopover={isMini}
            sidebarExpandedWidth={sidebarExpandedWidth}
          />
        ),
      }),
      [
        depth,
        id,
        isExpanded,
        isFullyCollapsed,
        isFullyExpanded,
        isMini,
        isSelected,
        item.children,
        onClick,
        ensureExpand,
        onLinkClick,
        sidebarExpandedWidth,
      ]
    );

  return (
    <DashboardSidebarPageItemContext.Provider value={pageItemContextProps}>
      {renderPageItem ? (
        renderPageItem(item, { mini: isMini })
      ) : (
        <DashboardSidebarPageItem item={item} />
      )}
    </DashboardSidebarPageItemContext.Provider>
  );
}

interface DashboardSidebarSubNavigationProps {
  subNavigation: Navigation;
  depth?: number;
  onLinkClick: () => void;
  isMini?: boolean;
  isPopover?: boolean;
  isFullyExpanded?: boolean;
  isFullyCollapsed?: boolean;
  hasDrawerTransitions?: boolean;
  sidebarExpandedWidth: number | string;
  renderPageItem?: (
    item: NavigationPageItem,
    params: { mini: boolean }
  ) => React.ReactNode;
}

/**
 * @ignore - internal component.
 */
function DashboardSidebarSubNavigation({
  subNavigation,
  depth = 0,
  onLinkClick,
  isMini = false,
  isPopover = false,
  isFullyExpanded = true,
  isFullyCollapsed = false,
  hasDrawerTransitions = false,
  sidebarExpandedWidth,
  renderPageItem,
}: DashboardSidebarSubNavigationProps) {
  const navigationContext = React.useContext(NavigationContext);
  const theme = useTheme();
  const location = useLocation();

  const initialExpandedItemIds = React.useMemo(
    () =>
      subNavigation
        .map((navigationItem, navigationItemIndex) => ({
          navigationItem,
          originalIndex: navigationItemIndex,
        }))
        .filter(
          ({ navigationItem }) =>
            isPageItem(navigationItem) &&
            hasSelectedNavigationChildren(
              navigationContext,
              navigationItem,
              location.pathname
            )
        )
        .map(({ originalIndex }) => `page-${depth}-${originalIndex}`),
    [depth, navigationContext, subNavigation]
  );

  const [expandedItemIds, setExpandedItemIds] = React.useState(
    initialExpandedItemIds
  );

  const ensureItemExpand = React.useCallback(
    (itemId: string, item: NavigationPageItem) => {
      if (item.children && !isMini) {
        if (!expandedItemIds.includes(itemId)) {
          setExpandedItemIds([...expandedItemIds, itemId]);
        }
      }
    },
    [isMini]
  );

  const handlePageItemClick = React.useCallback(
    (itemId: string, item: NavigationPageItem) => {
      if (item.children && !isMini) {
        setExpandedItemIds((previousValue) =>
          previousValue.includes(itemId)
            ? previousValue.filter(
                (previousValueItemId) => previousValueItemId !== itemId
              )
            : [...previousValue, itemId]
        );
        // onLinkClick();
      } else if (!item.children) {
        onLinkClick();
      }
    },
    [isMini, onLinkClick]
  );

  return (
    <List
      sx={{
        padding: 0,
        mt: isPopover && depth === 1 ? 0.5 : 0,
        mb: depth === 0 && !isPopover ? 4 : 0.5,

        pl: (isPopover ? 1 : 2) * (isPopover ? depth - 1 : depth),
        // TODO: keep the same with drawer width
        minWidth: isPopover && depth === 1 ? 240 : "auto",
        width: isMini ? MINI_DRAWER_WIDTH : "auto",
        //backgroundColor: alpha(theme.palette.background.default, 0.25),
      }}
    >
      {subNavigation.map((navigationItem, navigationItemIndex) => {
        if (navigationItem.kind === "header") {
          return (
            <ListSubheader
              key={`subheader-${depth}-${navigationItemIndex}`}
              sx={{
                fontSize: 12,
                fontWeight: "700",
                height: isMini ? 0 : 40,

                ...(hasDrawerTransitions
                  ? getDrawerSxTransitionMixin(isFullyExpanded, "height")
                  : {}),

                px: 2,
                minWidth: sidebarExpandedWidth,
                // overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                zIndex: 2,
                // TODO: change the color here.
                backgroundColor: alpha(theme.palette.background.default, 0.25),
                position: "inherit",
              }}
            >
              {getItemTitle(navigationItem)}
            </ListSubheader>
          );
        }

        if (navigationItem.kind === "divider") {
          const nextItem = subNavigation[navigationItemIndex + 1];

          return (
            <li key={`divider-${depth}-${navigationItemIndex}`}>
              <Divider
                sx={{
                  borderBottomWidth: 2,
                  mx: 1,
                  mt: 1,
                  mb: nextItem?.kind === "header" && !isMini ? 0 : 1,
                  ...(hasDrawerTransitions
                    ? getDrawerSxTransitionMixin(isFullyExpanded, "margin")
                    : {}),
                }}
              />
            </li>
          );
        }

        const pageItemId = `page-${depth}-${navigationItemIndex}`;

        return (
          <DashboardSidebarSubNavigationPageItem
            key={pageItemId}
            id={pageItemId}
            item={navigationItem}
            isExpanded={expandedItemIds.includes(pageItemId)}
            onClick={handlePageItemClick}
            ensureExpand={ensureItemExpand}
            depth={depth}
            onLinkClick={onLinkClick}
            isMini={isMini}
            isFullyExpanded={isFullyExpanded}
            isFullyCollapsed={isFullyCollapsed}
            sidebarExpandedWidth={sidebarExpandedWidth}
            renderPageItem={renderPageItem}
          />
        );
      })}
    </List>
  );
}

export { DashboardSidebarSubNavigation };

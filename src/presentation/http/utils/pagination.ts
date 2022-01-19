/* eslint-disable no-restricted-globals */
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
  MAX_PAGINATION_LIMIT,
} from '../../../common/constants';

export function getDefaultLimit(limit?: number): number {
  if (limit == null) {
    return DEFAULT_PAGINATION_LIMIT;
  }
  if (isNaN(limit)) {
    return DEFAULT_PAGINATION_LIMIT;
  }
  if (Number(limit) > MAX_PAGINATION_LIMIT) {
    return MAX_PAGINATION_LIMIT;
  }
  return limit;
}

export function getDefaultPage(page?: number): number {
  if (page == null) {
    return DEFAULT_PAGINATION_PAGE;
  }
  if (isNaN(page)) {
    return DEFAULT_PAGINATION_PAGE;
  }
  return page;
}

package util

import "strconv"

// returns PageNumber and PageLimit, if not provided defaults to (1, 20)
func ParsePagination(pageParam string, limitParam string) (int, int) {
	var page int
	var limit int
	page = 1
	limit = 20
	if pageParam == "" {
		page = 1
	}
	if limitParam == "" {
		limit = 20
	}
	p, err := strconv.Atoi(pageParam)
	if err == nil {
		page = p
	}
	lim, err := strconv.Atoi(limitParam)
	if err == nil {
		limit = lim
	}
	return page, limit
}

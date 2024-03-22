import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction } from "react";

type Props = {
    pages: number[];
    last: number;
    curPage: number,
    handlePageChange: Dispatch<SetStateAction<number>>
};

function CPagination(props: Props) {
    return (
        <Pagination>
            <PaginationContent>
                {props.pages[0] !== 1 && (
                    <PaginationItem>
                        <PaginationPrevious onClick={() => props.handlePageChange(props.curPage - 1)}/>
                    </PaginationItem>
                )}
                {props.pages.map((p) => {
                    return (
                        <PaginationItem>
                            <PaginationLink onClick={() => props.handlePageChange(p)} isActive={p === props.curPage}>{p}</PaginationLink>
                        </PaginationItem>
                    );
                })}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => {props.handlePageChange(props.last)}}>{props.last}</PaginationLink>
                </PaginationItem>
                {props.pages[0] !== props.last && (
                    <PaginationItem>
                        <PaginationNext  onClick={() => props.handlePageChange(props.curPage + 1)}/>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
export default CPagination;

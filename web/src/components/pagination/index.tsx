import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
    pages: number[];
    last: number;
};

function CPagination(props: Props) {
    return (
        <Pagination>
            <PaginationContent>
                {props.pages[0] !== 1 && (
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                )}
                {props.pages.map((p) => {
                    return (
                        <PaginationItem>
                            <PaginationLink href="#">{p}</PaginationLink>
                        </PaginationItem>
                    );
                })}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">{props.last}</PaginationLink>
                </PaginationItem>
                {props.pages[0] !== props.last && (
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
export default CPagination;

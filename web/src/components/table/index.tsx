import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import CEditor from "../editor";
import { TCitizen } from "types";

type Props = {
    citizens: TCitizen[] | null;
};

function CTable(props : Props) {
    return (
        <Table>
            <TableCaption>A list of citizens.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">FName</TableHead>
                    <TableHead>LName</TableHead>
                    <TableHead>DOB</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Pin</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.citizens?.map((invoice) => (
                    <TableRow key={invoice.first_name}>
                        <TableCell className="font-medium">{invoice.first_name}</TableCell>
                        <TableCell className="font-medium">{invoice.last_name}</TableCell>
                        <TableCell>{invoice.date_of_birth.split("T")[0]}</TableCell>
                        <TableCell>{invoice.gender}</TableCell>
                        <TableCell>{invoice.address}</TableCell>
                        <TableCell>{invoice.city}</TableCell>
                        <TableCell>{invoice.state}</TableCell>
                        <TableCell>{invoice.pincode}</TableCell>
                        <TableCell className="text-right">
                            <CEditor citizen={invoice} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                    <TableCell colSpan={8}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter> */}
        </Table>
    );
}
export default CTable;

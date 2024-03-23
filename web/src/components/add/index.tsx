import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { TCitizen } from "../../../types";
import { toast } from "react-toastify";
import axios from "axios";

type Props = {
    fetchPageData: () => Promise<void>;
};

function CEditor(props: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<TCitizen>({
        _id: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    async function handleAdd(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(false);
        const response = axios.post("http://localhost:8000", {
            ...data,
            date_of_birth: new Date(data.date_of_birth),
        });
        toast.promise(response, {
            pending: "Saving...",
            success: "Citizen added!",
            error: "Something went wrong!",
        });
        response
            .then(() => {
                setLoading(false);
                setError(false);
                props.fetchPageData();
                setData({
                    ...data,
                    _id: "",
                    first_name: "",
                    last_name: "",
                    date_of_birth: "",
                    address: "",
                    city: "",
                    state: "",
                    pincode: "",
                });
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    }

    return (
        <Dialog>
            {loading}
            {error}
            <DialogTrigger asChild>
                <Button variant="outline">Add Citizen</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] max-h-[700px] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Add Citizen</DialogTitle>
                    <DialogDescription>Add a new citizen.</DialogDescription>
                </DialogHeader>
                <form action="/" onSubmit={handleAdd}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                First Name
                            </Label>
                            <Input
                                disabled={loading}
                                id="name"
                                value={data.first_name}
                                className="col-span-3"
                                required
                                onChange={(e) => {
                                    setData({ ...data, first_name: e.target.value });
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Last Name
                            </Label>
                            <Input
                                disabled={loading}
                                id="username"
                                value={data.last_name}
                                className="col-span-3"
                                required
                                onChange={(e) => {
                                    setData({ ...data, last_name: e.target.value });
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dob" className="text-right">
                                Date of Birth
                            </Label>
                            <Input
                                disabled={loading}
                                id="dob"
                                className="col-span-3"
                                type="date"
                                value={data.date_of_birth.split("T")[0]}
                                required
                                onChange={(e) => {
                                    setData({ ...data, date_of_birth: e.target.value });
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="gender" className="text-right">
                                Gender
                            </Label>
                            <Select
                                required
                                onValueChange={(e) => {
                                    setData({ ...data, gender: e });
                                }}
                            >
                                <SelectTrigger className="w-[342px]" disabled={loading}>
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">
                                Address
                            </Label>
                            <Input
                                disabled={loading}
                                id="address"
                                value={data.address}
                                className="col-span-3"
                                required
                                onChange={(e) => {
                                    setData({ ...data, address: e.target.value });
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="city" className="text-right">
                                City
                            </Label>
                            <Input
                                disabled={loading}
                                id="city"
                                value={data.city}
                                className="col-span-3"
                                required
                                onChange={(e) => {
                                    setData({ ...data, city: e.target.value });
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="state" className="text-right">
                                State
                            </Label>
                            <Input
                                disabled={loading}
                                id="state"
                                value={data.state}
                                className="col-span-3"
                                required
                                onChange={(e) => {
                                    setData({ ...data, state: e.target.value });
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pincode" className="text-right">
                                Pincode
                            </Label>
                            <Input
                                disabled={loading}
                                id="pincode"
                                value={data.pincode}
                                className="col-span-3"
                                required
                                onChange={(e) => {
                                    setData({ ...data, pincode: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            Save citizen
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
export default CEditor;

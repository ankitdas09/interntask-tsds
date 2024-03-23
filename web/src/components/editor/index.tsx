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
    citizen: TCitizen;
    fetchPageData: () => Promise<void>;
};

function CEditor(props: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<TCitizen>({
        _id: props.citizen._id,
        first_name: props.citizen.first_name,
        last_name: props.citizen.last_name,
        date_of_birth: props.citizen.date_of_birth,
        gender: props.citizen.gender,
        address: props.citizen.address,
        city: props.citizen.city,
        state: props.citizen.state,
        pincode: props.citizen.pincode,
    });

    async function handleEdit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(false);
        const response = axios.put("http://localhost:8000", data);
        toast.promise(response, {
            pending: "Saving...",
            success: "Citizen updated!",
            error: "Something went wrong!",
        });
        response
            .then((resp) => {
                setLoading(false);
                setError(false);
                props.fetchPageData();
                console.log(resp.data);
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
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] max-h-[700px] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Edit Citizen Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form action="/" onSubmit={handleEdit}>
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
                                defaultValue={data.gender}
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
                            Save changes
                        </Button>
                    </DialogFooter>
                    <DialogFooter>
                        <Button className="bg-red-800 mt-2" type="submit" disabled={loading}>
                            Delete Citizen
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
export default CEditor;

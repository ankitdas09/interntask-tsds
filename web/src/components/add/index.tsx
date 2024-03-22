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
import { useEffect, useState } from "react";
import { TCitizen } from "../../../types";

// type Props = {
//     citizen: TCitizen;
// };

function CAddCitizen() {
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

    useEffect(() => {
        setLoading(false);
        setError(false);
        // setData({
        //     _id: props.citizen._id,
        //     first_name: props.citizen.first_name,
        //     last_name: props.citizen.last_name,
        //     date_of_birth: props.citizen.date_of_birth,
        //     gender: props.citizen.gender,
        //     address: props.citizen.address,
        //     city: props.citizen.city,
        //     state: props.citizen.state,
        //     pincode: props.citizen.pincode,
        // });
    }, []);

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
                    <DialogDescription>
                        Add new citizen.
                    </DialogDescription>
                </DialogHeader>
                <form action="/">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                First Name
                            </Label>
                            <Input
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
                            <Select required onValueChange={(e) => {
                                setData({...data, gender: e})
                            }}>
                                <SelectTrigger className="w-[342px]">
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
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                    <DialogFooter>
                        <Button className="bg-red-800 mt-2" type="submit">
                            Delete Citizen
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
export default CAddCitizen;
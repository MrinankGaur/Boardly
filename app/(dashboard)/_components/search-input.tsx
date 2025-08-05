"use client";
import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounceValue} from "usehooks-ts";
import { useRouter } from "next/navigation";
import { 
    ChangeEvent,
    useEffect,
    useState,
} from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams } from "next/navigation";



export const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [debouncedValue] = useDebounceValue(value, 500);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(()=>{
        const url = qs.stringifyUrl({
           url: "/",
           query: {
            search: debouncedValue,
           }, 
        },{ skipEmptyString: true,skipNull: true});
        const current = qs.stringifyUrl({ 
            url: pathname,
            query: Object.fromEntries(searchParams.entries()),
        }, { skipEmptyString: true, skipNull: true });

        if (url !== current) {
            router.replace(url);
        }
        
    },[debouncedValue, router, pathname, searchParams]);



    return(
        <div className=" w-full relative">
            <Search
                className="absolute top-1/2 left-3 transform -translate-y-1/2 
                text-muted-foregound h-4 w-4"
            />
            <Input
                className="w-full max-w-[516px] pl-9"
                placeholder="Search Boards"
                onChange={handleChange}
                value={value}
                
            />
        </div>
    )
}
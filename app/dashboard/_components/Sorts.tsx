"use client";
import { Select, SelectItem } from "@heroui/select";
import { usePathname, useRouter } from "next/navigation";
import { sortTypes } from "@/lib/constant";
import { useState } from "react";

const Sorts = () => {
  const path = usePathname();
  const router = useRouter();
  const [values, setValues] = useState<string>("");

  //   const handleSort = (value: string) => {
  //     router.push(`${path}?sort=${value}`);
  //   };
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setValues(selectedValue);
    router.push(`${path}?sort=${selectedValue}`);
  };
  return (
    <Select
      className="max-w-xs sort-select"
      // defaultSelectedKeys={values || sortTypes[0].value}
      selectedKeys={values}
      selectionMode="single"
      onChange={handleSelectionChange}
      placeholder={
        values
          ? sortTypes.find((item) => item.value === values)?.label
          : sortTypes[0].label
      }
      aria-label="Sort by"
    >
      {sortTypes.map((items) => (
        <SelectItem key={items.value} className="sort-select-content">
          {items.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Sorts;

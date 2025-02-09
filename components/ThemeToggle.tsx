"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Switch from "react-switch";
import clsx from "clsx";
import { cn } from "@/lib/utils";

const ThemeToggle = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // Wait for the component to be mounted before using theme data
  useEffect(() => setMounted(true), []);

  const handleChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  // Prevent rendering of the switch until the component is mounted
  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={24}
        height={16}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    );

  return (
    <div
      className={clsx(
        "p-2 lg:ml-5 rounded-[2px] text-sm text-[#334155] hover:bg-select-100 dark:text-white hover:text-blue-100 hover:dark:bg-blue-100 hover:dark:text-select-100 duration-400 flex items-center gap-2"
      )}
    >
      <Switch
        onChange={handleChange}
        checked={resolvedTheme === "dark"} // Check if the current theme is dark
        id="react-switch"
        offColor="#E2E8F0"
        onColor="#8576FF"
        uncheckedIcon={false}
        checkedIcon={false}
        height={24}
        width={42}
        handleDiameter={18}
        boxShadow="none"
        activeBoxShadow="none"
      />

      <p className={cn("hidden lg:block", className)}>
        {resolvedTheme === "dark" ? "Dark mode" : "Light mode"}
      </p>
    </div>
  );
};

export default ThemeToggle;

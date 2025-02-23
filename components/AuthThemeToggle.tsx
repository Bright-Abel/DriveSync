"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { FiMoon, FiSun } from "react-icons/fi"; // Assuming you have imported these icons

const AuthThemeToggle = ({ className }: { className?: string }) => {
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
    <button
      type="button"
      className="text-brand dark:text-brand-200 outline-none focus:outline-none absolute top-4 right-4"
      onClick={() => handleChange(resolvedTheme !== "dark")}
    >
      {resolvedTheme === "dark" ? (
        <FiMoon className="text-4xl" />
      ) : (
        <FiSun className="text-4xl" />
      )}
    </button>
  );
};

export default AuthThemeToggle;

import { cn, formatDateTime } from "@/lib/utils";

interface Props {
  date: string;
  className?: string;
}

const FormattedDateAndTime = ({ date, className }: Props) => {
  return (
    <p className={cn("body-1 text-light-200 dark:text-light-300", className)}>
      {formatDateTime(date)}
    </p>
  );
};

export default FormattedDateAndTime;

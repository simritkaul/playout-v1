import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface InfoCardProps {
  icon: React.ReactNode;
  value?: string | undefined;
  description: string;
  customJsx?: React.ReactNode | undefined;
}

const InfoCard = ({ icon, value, description, customJsx }: InfoCardProps) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="shadow-lg border border-blue-200">
              <CardContent className="p-6 space-y-6">
                <span className="flex items-center justify-center space-x-2">
                  {icon}
                  {!!customJsx ? customJsx : <p>{value}</p>}
                </span>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-black">
            <p>{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default InfoCard;

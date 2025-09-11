import { Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="h-full w-full p-2 pt-4 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary md:col-span-2 rounded-lg shadow-sm relative">
          <CardContent className="flex flex-col justify-center py-4 px-6 relative z-10">
            <div className="max-w-md">
              <h1 className="text-xl font-bold text-white mb-1">
                Welcome to RCD Realty Marketing Corp
              </h1>
              <p className="text-sm text-[#F1F1F1]">
                Manage properties, agents, and clients with ease —
              </p>
              <p className="text-sm text-[#F1F1F1]">
                all your real estate operations in one place.
              </p>
            </div>
          </CardContent>

          {/* Image Section - half outside */}
          <div className="absolute right-[155px] top-2/5 -translate-y-1/2 w-[310px] h-[310px] translate-x-1/2">
            <Image
              src="/rcd-dashboard.png"
              alt="RCD-Dashboard"
              fill
              className="object-contain"
            />
          </div>
        </Card>

        {/* Card 2 - normal width */}
        <Card className="md:col-span-1 rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">$12,340</p>
            <p className="text-sm text-white">+8% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card className="bg-primary rounded-lg shadow-sm gap-y-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-normal text-white">
              Total Properties Listed
            </CardTitle>
            <div className="flex items-center justify-center w-10 h-9 rounded-full bg-white/10">
              <Building className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">1,250</div>
          </CardContent>
        </Card>

        <Card className="rounded-lg shadow-sm gap-y-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-normal text-primary">
              Total Properties Sold
            </CardTitle>
            <div className="flex items-center justify-center w-10 h-9 rounded-full bg-primary/10">
              <Building className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">100</div>
          </CardContent>
        </Card>

        <Card className="rounded-lg shadow-sm gap-y-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-normal text-primary">
              Total Properties Sold
            </CardTitle>
            <div className="flex items-center justify-center w-10 h-9 rounded-full bg-primary/10">
              <Building className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">56</div>
          </CardContent>
        </Card>

        <Card className="rounded-lg shadow-sm gap-y-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-normal text-primary">
              Total Properties Sold
            </CardTitle>
            <div className="flex items-center justify-center w-10 h-9 rounded-full bg-primary/10">
              <Building className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">89</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <Card className="rounded-lg shadow-sm gap-y-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-normal text-primary">
              Total Properties Sold
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <Card className="rounded-lg shadow-sm gap-y-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-normal text-primary">
              Total Properties Sold
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>

        <Card className="rounded-lg shadow-sm gap-y-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-normal text-primary">
              Total Properties Sold
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}

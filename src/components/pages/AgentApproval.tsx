"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronLeft, HouseIcon, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export default function AgentApproval() {
  return (
    <>
      <div className="flex items-center">
        <Link href="/agents-registration">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Agent Approval</h1>
      </div>

      <div className="w-full max-w-7xl mx-auto p-2 pt-0">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="col-span-2 rounded-md flex flex-col overflow-hidden border shadow-none">
            <CardContent className="flex flex-col items-center text-center overflow-y-auto scrollbar-hide flex-1 p-4">
              {/* Profile Image */}
              <div className="w-40 h-40 bg-white rounded-md mb-3 flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src="/placeholder.png"
                  alt="Profile Picture"
                  width={160}
                  height={140}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Name */}
              <h2 className="text-lg font-semibold mb-5 truncate w-full">
                John William Doe
              </h2>

              {/* Basic Info */}
              <div className="w-full space-y-3 mb-4 text-left">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">Agent Registration ID</div>
                    <div className="text-xs font-medium truncate">22</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">Employee ID Number</div>
                    <div className="text-xs font-medium truncate">27272</div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="w-full pt-4 border-t">
                <h3 className="text-sm font-semibold mb-3 text-left">
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <div className="flex items-start gap-2">
                    <HouseIcon className="h-4 w-4 text-primary mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <label className="text-xs text-gray-500">Address</label>
                      <div className="text-xs font-medium break-words">
                        123 Example Street, Makati City
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-primary mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <label className="text-xs text-gray-500">Email</label>
                      <div className="text-xs font-medium truncate">
                        johndoe@gmail.com
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-primary mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <label className="text-xs text-gray-500">Contact Number</label>
                      <div className="text-xs font-medium truncate">0927 282 8282</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Valid Documents */}
              <div className="w-full mt-6 pt-4 border-t">
                <h3 className="text-sm font-semibold mb-3 text-left">Valid Documents</h3>

                <div className="space-y-5 text-left">
                  <div>
                    <h4 className="text-sm text-gray-600 mb-2">ID Attachment</h4>
                    <div className="w-full h-48 rounded-md border border-gray-200 bg-gray-50 overflow-hidden">
                      <Image
                        src="/placeholder.png"
                        alt="ID Attachment"
                        width={600}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-gray-600 mb-2">Selfie with ID</h4>
                    <div className="w-full h-48 rounded-md border border-gray-200 bg-gray-50 overflow-hidden">
                      <Image
                        src="/placeholder.png"
                        alt="Selfie with ID"
                        width={600}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="md:col-span-3 sm:col-span-3">
            <Card className="flex flex-col shadow-none rounded-md border-none bg-transparent">
              <CardHeader>
                <CardTitle className="text-lg font-semibold"></CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

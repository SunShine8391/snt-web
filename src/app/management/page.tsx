import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { KitCard } from "@/components/views/management/kit-card";
import { KitLists } from "@/config/constants";

const Management = () => {
  const invoices = [
    {
      kitName: "SPOT8L32RT",
      kitDescription: "cvs_biometric_kit",
      order: "OV2LJHIFJV",
      kitStatus: "delivered",
      sampleStatus: "awaiting collection",
      panelName: "Biometric Panel",
      panelDescription: "Sample SPOT8L32RT",
      registerName: "Cindy haversham",
      registerEmail: "cindy.haversham@yahoo.com",
      report: "view",
    },
    {
      kitName: "SPOT8L32RT",
      kitDescription: "cvs_biometric_kit",
      order: "",
      kitStatus: "registered",
      sampleStatus: "resulted",
      panelName: "Biometric Panel",
      panelDescription: "Sample SPOT8L32RT",
      registerName: "",
      registerEmail: "",
      report: "",
    },
    {
      kitName: "SPOT8L32RT",
      kitDescription: "cvs_biometric_kit",
      order: "",
      kitStatus: "",
      sampleStatus: "awaiting collection",
      panelName: "Biometric Panel",
      panelDescription: "Sample SPOT8L32RT",
      registerName: "",
      registerEmail: "",
      report: "",
    },
    {
      kitName: "SPOT8L32RT",
      kitDescription: "cvs_biometric_kit",
      order: "OSHMKFVITN",
      kitStatus: "registered",
      sampleStatus: "",
      panelName: "Biometric Panel",
      panelDescription: "Sample SPOT8L32RT",
      registerName: "Pat Rodham",
      registerEmail: "pat.rodham@gmail.com",
      report: "",
    },
    {
      kitName: "SPOT8L32RT",
      kitDescription: "cvs_biometric_kit",
      order: "O7L577PQQ7",
      kitStatus: "delivered",
      sampleStatus: "awaiting collection",
      panelName: "Biometric Panel",
      panelDescription: "Sample SPOT8L32RT",
      registerName: "",
      registerEmail: "",
      report: "true",
    },
  ];

  return (
    <div className="h-full px-8 pt-24" style={{ height: "calc(100vh - 60px)" }}>
      <div className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {KitLists.map((item: any, index: number) => (
          <KitCard
            key={index}
            value={item.value}
            label={item.label}
            bgColor={item.bgColor}
          />
        ))}
      </div>
      <div className="bg-slate-50 rounded-md flex flex-col gap-4 lg:flex-row justify-between p-4 mt-5">
        <div className="flex flex-row gap-4">
          <Input
            type="email"
            placeholder="Type to search"
            className="w-[240px]"
          />
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row gap-4">
          <Button variant="outline">Export</Button>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filters" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kit</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Kit Status</TableHead>
              <TableHead>Sample status</TableHead>
              <TableHead>Panels</TableHead>
              <TableHead>Registered to</TableHead>
              <TableHead>PDF report</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="font-semibold text-sm text-slate-600">
                      {invoice.kitName}
                    </div>
                    <div className="font-normal text-xs text-slate-500">
                      {invoice.kitDescription}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-slate-700 font-bold">
                  {invoice.order}
                </TableCell>
                <TableCell>
                  {invoice.kitStatus.length ? (
                    invoice.kitStatus.toUpperCase() === "REGISTERED" ? (
                      <div className="rounded-sm border bg-green-100 text-green-400 w-fit px-1 border-green-300">
                        REGISTERED
                      </div>
                    ) : (
                      <div className="rounded-sm border bg-blue-100 text-blue-400 w-fit px-1 border-blue-300">
                        DELIVERED
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>
                  {invoice.sampleStatus.length ? (
                    invoice.sampleStatus.toUpperCase() === "RESULTED" ? (
                      <div className="rounded-sm border bg-green-100 text-green-400 w-fit px-1 border-green-300">
                        RESULTED
                      </div>
                    ) : (
                      <div className="rounded-sm border bg-blue-100 text-blue-400 w-fit px-1 border-blue-300">
                        AWATING COLLECTION
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="font-semibold text-sm text-slate-600">
                      {invoice.panelName}
                    </div>
                    <div className="font-normal text-xs text-slate-500">
                      {invoice.panelDescription}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="font-bold text-sm text-slate-700">
                      {invoice.registerName}
                    </div>
                    <div className="font-normal text-xs text-slate-500">
                      {invoice.registerEmail}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {invoice.report.length ? (
                    <div className="font-bold text-sm text-slate-700 cursor-pointer underline">
                      View Report
                    </div>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Management;

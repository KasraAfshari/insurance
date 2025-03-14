import React, { useState, useEffect } from "react";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectItem,
  DateRangePicker,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { useGetFormsQuery } from "@/features/api/formsApi";

export default function DashboardPage() {
  const { t } = useTranslation();
  const { data, error, isLoading } = useGetFormsQuery();

  const [insuranceType, setInsuranceType] = useState<[]>([]);

  const [selectedType, setSelectedType] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (data && data.data) {
      const types = data.data.map((item) => item["Insurance Type"]);
      setInsuranceType([...new Set(types)]);
    }
  }, [data]);

  useEffect(() => {
    if (selectedType) {
      const filtered = data?.data.filter(
        (item) => item["Insurance Type"] === selectedType
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data?.data);
    }
  }, [selectedType, data]);

  const applicationType = [
    { key: "Pending", label: "Pending" },
    { key: "Approved", label: "Approved" },
    { key: "Rejected", label: "Rejected" },
    { key: "None", label: "None" },
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title({ color: "cyan" })}>{t("smart")}&nbsp;</span>
          <span className={title()}> {t("insurance")} &nbsp;</span>
          <br />
          <div className={subtitle({ class: "mt-4 font-thin" })}>
            Beautiful, fast and modern Portal
          </div>
        </div>

        <div className="flex w-full flex-wrap justify-center items-center md:flex-nowrap gap-4">
          <div className="flex flex-row items-center justify-center gap-8  bg-[rgba(0,183,235,0.2)] w-80 py-4 rounded-xl">
            <span className="text-sm font-thin">Insurance Type</span>
            <select
              value={selectedType}
              className="p-4 rounded-lg "
              onChange={(e) => setSelectedType(e.target.value)}>
              <option value="">All</option>
              {insuranceType.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-row items-center justify-center gap-8  bg-[rgba(0,183,235,0.2)] w-80 py-4 rounded-xl">
            <span className="text-sm font-thin">Application Type</span>
            <select className="p-4 rounded-lg ">
              <option value="">All</option>
              {applicationType.map((item) => (
                <option key={item.key} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <DateRangePicker
            size="sm"
            //variant="bordered"
            className="max-w-xs"
            defaultValue={{
              start: parseDate("2024-04-01"),
              end: parseDate("2024-04-08"),
            }}
            label="Insurance duration"
          />
        </div>

        <div className="mt-4 w-full">
          {data && (
            <Table>
              <TableHeader>
                {["Id", ...data.columns].map((item, index) => (
                  <TableColumn key={index}>{item}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {filteredData?.map((form: any) => (
                  <TableRow key={form.id}>
                    <TableCell>{form.id}</TableCell>
                    <TableCell>{form["Full Name"]}</TableCell>
                    <TableCell>{form.Age}</TableCell>
                    <TableCell>{form.Gender}</TableCell>
                    <TableCell>{form["Insurance Type"]}</TableCell>
                    <TableCell>{form.City}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}

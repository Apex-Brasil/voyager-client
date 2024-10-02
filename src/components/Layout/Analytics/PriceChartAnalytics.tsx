/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deepClone, getStorage, setStorage } from "utils-react";

import { QueryCacheKeyGetters } from "../../../services/queryService";
import TVExamples from "../../TVExamples";

export const PriceChartAnalyticsFrame = () => {
  const router = useRouter();

  const { id, schema: qSchema, template: qTemplate } = router.query;

  const { data: dataFilters } = useQuery({
    queryKey: ["collectionFilters"],
    queryFn: () => QueryCacheKeyGetters.collectionFilters(id as string),
  });

  const [selectedSchema, setSelectedSchema] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<any>(
    getStorage("selectedTemplate") || "",
  );

  const [hidden, setHidden] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (selectedSchema === "") {
      setStorage("selectedTemplate", null);
    }
  }, [selectedSchema]);

  const handleChange = (e: any) => {
    setHidden(true);
    setLoading(true);
    const template = e.target.value;
    const currentName = dataFilters.data
      .find(item => item.schema_name === selectedSchema)
      .assets.find(item => item.template === template)?.data.name;
    setSelectedName(currentName);
    setSelectedTemplate(template);
    const tempObj = {
      name: template,
      description: currentName,
    };

    router.replace(
      {
        query: {
          ...router.query,
          schema: selectedSchema,
          template: e.target.value,
        },
      },
      undefined,
      { shallow: true },
    );

    setStorage("selectedTemplate", tempObj);
  };

  const handleSchemaChange = (e: any) => {
    setHidden(true);
    setLoading(true);
    setSelectedName("");
    setSelectedSchema(e.target.value);
    const template = dataFilters.data.find(
      item => item.schema_name === e.target.value,
    )?.assets?.[0]?.template;
    const currentName = dataFilters.data.find(
      item => item.schema_name === e.target.value,
    )?.assets?.[0]?.data.name;
    setSelectedName(currentName);
    setSelectedTemplate(template);
    const tempObj = {
      name: template,
      description: currentName,
    };

    router.replace(
      {
        query: {
          ...router.query,
          schema: e.target.value,
          template,
        },
      },
      undefined,
      { shallow: true },
    );

    setStorage("selectedTemplate", tempObj);
    setLoading(false);
  };

  const applyFilters = () => {
    const assets = dataFilters.data.find(
      item => item.schema_name === selectedSchema,
    )?.assets;

    const tempArray: any[] = deepClone(assets || []);
    return tempArray;
  };

  useEffect(() => {
    if (selectedTemplate) {
      setTimeout(() => {
        setHidden(false);
        setLoading(false);
      }, 300);
    }
  }, [selectedTemplate]);

  const renderGraphic = () => {
    const selectedTemplate = getStorage("selectedTemplate");
    if (
      !selectedTemplate ||
      !selectedSchema ||
      selectedName === "" ||
      hidden ||
      loading
    ) {
      return (
        <div className="w-full flex justify-center">
          <div className="loading-circle">
            <div></div>
          </div>
        </div>
      );
    }

    return (
      <div className={`relative`}>
        <TVExamples />
        <div>
          <a
            href="https://tradingview.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#a4a4a4]"
          >
            Chart built using Trading View. All rights reserved.
          </a>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (dataFilters && dataFilters?.collection_name === id) {
      const initialSchema = qSchema || dataFilters?.data?.[0]?.schema_name;
      const initialName = qTemplate
        ? dataFilters?.data
            .find(item => item.schema_name === qSchema)
            ?.assets?.find(item => +item.template === +qTemplate)?.data?.name
        : dataFilters?.data?.[0]?.assets?.[0]?.data?.name;
      const initialTemplate =
        qTemplate || dataFilters?.data?.[0]?.assets?.[0]?.template;

      setSelectedSchema(initialSchema);
      setSelectedName(initialName);
      setSelectedTemplate(initialTemplate);
      const tempObj = {
        name: initialTemplate,
        description: initialName,
      };

      setStorage("selectedTemplate", tempObj);
      setTimeout(() => {
        setHidden(false);
        setLoading(false);
      }, 300);
    }
  }, [dataFilters, id, qSchema, qTemplate]);

  return (
    <section className="flex flex-col justify-start items-center gap-5 h-[100vh] w-full">
      <section className="flex justify-center items-center flex-wrap gap-5">
        <select
          className={`drop-shadow-2xl md:w-[215px] w-[130px] h-[48px] rounded-lg text-primary font-semibold p-2 outline-none dark:shadow-none box_shadow_light`}
          onChange={handleSchemaChange}
          value={selectedSchema}
        >
          <option value="" disabled={true} className={`dark:bg-black bg-white`}>
            Schema
          </option>
          {dataFilters &&
            dataFilters.data &&
            dataFilters.data.map((item, i) => (
              <option
                key={i}
                value={item.schema_name}
                className={`dark:bg-black bg-white`}
              >
                {item.schema_name}
              </option>
            ))}
        </select>

        {selectedSchema && (
          <>
            <select
              className={` drop-shadow-2xl md:w-[325px] w-[130px] h-[48px] rounded-lg text-primary font-semibold p-2 outline-none dark:shadow-none box_shadow_light`}
              onChange={handleChange}
              value={selectedTemplate}
            >
              <option value="" disabled={true}>
                name
              </option>
              {applyFilters().map((item, i) => (
                <option
                  key={i}
                  value={item.template}
                  className={`dark:bg-black bg-white`}
                >
                  <Image src={item.data.img} width={20} height={20} />{" "}
                  {item.data.name} - {item.template}
                </option>
              ))}
            </select>
          </>
        )}
      </section>

      <section className="relative w-[90%]">
        <div className="flex gap-2">
          <div className="flex-1">{renderGraphic()}</div>
        </div>
      </section>
    </section>
  );
};

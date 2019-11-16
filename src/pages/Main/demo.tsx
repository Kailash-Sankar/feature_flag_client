import React, { useState } from "react";
import ButtonGroup, { BGProps } from "@components/ButtonGroup";
import LoadingWrapper from "@components/LoadingWrapper";
import DatePicker from "@components/DatePicker";
import moment from "moment";
import SearchInput from "@components/SearchInput";
import VirtualizedTable from "@components/VirtualizedTable";
import Notify from "@utils/Notification";
import PageNotFound from "@components/PageNotFound";
import * as styles from "./demo.module.less";
import { Button, Icon } from "antd";
import Summary, { SummaryProps } from "@components/Summary";
import SliderChart from "@components/Charts";

type interval = [moment.Moment, moment.Moment] | [moment.Moment];

function Notifier() {
  const hadleClick = () =>
    setTimeout(() => {
      Notify({
        type: "info",
        message: "Test",
        description: "Notification check",
        key: "dummy"
      });
    }, 0);
  return (
    <Button onClick={hadleClick} style={{ fontSize: 20 }}>
      <Icon type="bulb" />
    </Button>
  );
}

function ErrorTest() {
  const [err, setErr] = useState(false);
  const breakCode = () => {
    setErr(true);
  };

  const throwErr = () => {
    throw new Error("Simulated render error");
  };

  return (
    <>
      {err ? throwErr() : " "}
      <span onClick={breakCode}>Click to simulate an error.</span>
    </>
  );
}

function Loading() {
  const [loading, setLoading] = React.useState(true);
  const [done, setDone] = React.useState(false);
  const error = { message: "Request failed" };

  const props: BGProps = {
    options: [
      { label: "Loading", value: "loading" },
      { label: "Done", value: "done" },
      { label: "Error", value: "error" }
    ],
    value: "loading",
    style: { marginTop: 10 },
    toggleAction: (ele: HTMLInputElement) => {
      switch (ele.value) {
        case "loading":
          setLoading(true);
          setDone(false);
          break;
        case "error":
          setLoading(false);
          setDone(false);
          break;
        case "done":
          setDone(true);
          break;
      }
    },
    attr: {}
  };

  return (
    <>
      <LoadingWrapper isLoading={loading} error={error} done={done}>
        <div>Data row one</div>
        <div>Data row two</div>
        <div>Data row three</div>
      </LoadingWrapper>
      <ButtonGroup {...props} />
    </>
  );
}

function Date({ showTime, showShortcuts, range }: { [key: string]: boolean }) {
  const shortcuts: Array<[string, interval]> = [
    ["Today", [moment().startOf("day"), moment()]],
    [
      "Yesterday",
      [
        moment()
          .subtract(1, "days")
          .startOf("day"),
        moment()
          .subtract(1, "days")
          .endOf("day")
      ]
    ],
    [
      "Last Week",
      [
        moment()
          .subtract(7, "days")
          .startOf("week"),
        moment()
          .subtract(7, "days")
          .endOf("week")
      ]
    ],
    ["This Month", [moment().startOf("month"), moment()]],
    ["Past 1 hour", [moment().subtract(1, "hour"), moment()]],
    ["Past 2 days", [moment().subtract(2, "days"), moment()]],
    ["Past 7 days", [moment().subtract(7, "days"), moment()]],
    ["Past 30 days", [moment().subtract(30, "days"), moment()]],
    ["Past 90 days", [moment().subtract(90, "days"), moment()]],
    ["Past 1 year", [moment().subtract(1, "year"), moment()]]
  ];

  let interval = [moment().subtract(2, "days")];
  let type = "date";

  if (range) {
    interval = [moment().subtract(2, "days"), moment()];
    type = "range";
  }

  const props = {
    defaultValue: interval as interval,
    disabledDate: () => false,
    shortcuts: showShortcuts ? shortcuts : [],
    title: "Pick a Date",
    expanded: false,
    fixedRange: false,
    showTime: showTime,
    type: type as "date" | "range"
  };

  return <DatePicker {...props} />;
}

function SI({ allowTyping }: { [key: string]: boolean }) {
  const data = [
    { text: "Anathema", value: "anathema" },
    { text: "Deargdeith", value: "deargdeith" },
    { text: "Gvennel", value: "gvennel" },
    { text: "Harpy", value: "harpy" },
    { text: "Ursine", value: "ursine" },
    { text: "Wolven", value: "wolven" },
    { text: "Maugrim", value: "maugrim" },
    { text: "Steiger", value: "steiger" }
  ];

  type value = string | number;

  const [value, setValue] = useState("");

  const props = {
    value: value,
    onChange: (value: value) => {
      setValue(value as string);
    },
    onSearch: (value: value) => {
      return {
        data: data.filter(d =>
          d.value.includes((value as string).toLowerCase())
        )
      };
    },
    defaultData: [],
    style: { minWidth: 120 }
  };

  return <SearchInput {...props} allowTyping={allowTyping} />;
}

function Table() {
  const columns = [
    {
      key: "items",
      name: "Items",
      dataIndex: "one",
      rowKey: "one",
      canSort: false,
      canFilter: false,
      total: "",
      headColumnClassName: "muffin"
    },
    {
      key: "alpha",
      name: "Alpha",
      dataIndex: "two",
      rowKey: "two",
      canSort: true,
      canFilter: true,
      //total: "",
      width: 120
    },
    {
      key: "beta",
      name: "Beta",
      dataIndex: "three",
      rowKey: "three",
      canSort: true,
      canFilter: true,
      total: "14",
      width: 120
    }
  ];

  const dataSource = [
    //{ one: "section-1", two: "m1", three: "m2" },
    //{ one: "section-2", two: "n1", three: "n2" }
  ];

  const randStr = (n = 5) =>
    Math.random()
      .toString(36)
      .slice(n);

  for (let i = 0; i < 100; i++) {
    const row = { one: randStr(8), two: randStr(4), three: randStr(5) };
    dataSource.push(row);
  }

  const tableProps = {
    dataSource: dataSource,
    columns: columns,
    filter: {},
    loading: false,
    emptyPlaceholder: "No Data",
    selections: ["two"],
    sortOrder: "one%%asc",
    className: styles.table
  };

  return <VirtualizedTable {...tableProps} />;
}

function PNF() {
  const [showPNF, setShowPNF] = useState(false);

  const toggleAction = () => setShowPNF(!showPNF);

  return (
    <>
      <Button onClick={toggleAction}>Toggle Page</Button>
      {showPNF ? <PageNotFound /> : ""}
    </>
  );
}

function MetricCard({ type }: { type: string }) {
  const metric = {
    name: "attempts",
    displayName: "Attempts",
    short: "att"
  };

  const types: { [key: string]: SummaryProps } = {
    simple: {
      metric: metric,
      value: 22
    },
    trend: {
      metric: metric,
      value: 12,
      trend: 0.025
    },
    highlighted: {
      metric: metric,
      value: 10,
      trend: -0.01,
      highlighted: true
    },
    checkable: {
      metric: metric,
      value: 12,
      trend: 0.025,
      checkable: true
    },
    checked: {
      metric: metric,
      value: 10,
      trend: 0.095,
      checkable: true,
      checked: true
    },
    disabled: {
      metric: metric,
      value: 5,
      trend: -0.005,
      disabled: true
    }
  };

  const props = types[type];

  return (
    <div style={{ display: "inline-block" }}>
      <Summary {...props} />
    </div>
  );
}

function Chart() {
  type NumT = number | undefined;
  type DataT = [string, number][];

  const data: DataT = [
    ["2019-04-19T19:22:00.000Z", 447494],
    ["2019-04-19T20:22:00.000Z", 518550],
    ["2019-04-19T21:22:00.000Z", 548343],
    ["2019-04-19T22:22:00.000Z", 684654],
    ["2019-04-19T23:22:00.000Z", 877550],
    ["2019-04-20T00:22:00.000Z", 983651],
    ["2019-04-20T01:22:00.000Z", 923098],
    ["2019-04-20T02:22:00.000Z", 791030],
    ["2019-04-20T03:22:00.000Z", 536046],
    ["2019-04-20T04:22:00.000Z", 318142],
    ["2019-04-20T05:22:00.000Z", 196726],
    ["2019-04-20T06:22:00.000Z", 127975],
    ["2019-04-20T07:22:00.000Z", 95390],
    ["2019-04-20T08:22:00.000Z", 90371],
    ["2019-04-20T09:22:00.000Z", 116713],
    ["2019-04-20T10:22:00.000Z", 218295],
    ["2019-04-20T11:22:00.000Z", 328056],
    ["2019-04-20T12:22:00.000Z", 414139],
    ["2019-04-20T13:22:00.000Z", 468374],
    ["2019-04-20T14:22:00.000Z", 464419],
    ["2019-04-20T15:22:00.000Z", 486727],
    ["2019-04-20T16:22:00.000Z", 473563],
    ["2019-04-20T17:22:00.000Z", 558828],
    ["2019-04-20T18:22:00.000Z", 614762],
    ["2019-04-20T19:22:00.000Z", 623580],
    ["2019-04-20T20:22:00.000Z", 626700],
    ["2019-04-20T21:22:00.000Z", 621256],
    ["2019-04-20T22:22:00.000Z", 725323],
    ["2019-04-20T23:22:00.000Z", 874837],
    ["2019-04-21T00:22:00.000Z", 884396],
    ["2019-04-21T01:22:00.000Z", 865477],
    ["2019-04-21T02:22:00.000Z", 728246],
    ["2019-04-21T03:22:00.000Z", 527054],
    ["2019-04-21T04:22:00.000Z", 358709],
    ["2019-04-21T05:22:00.000Z", 213021],
    ["2019-04-21T06:22:00.000Z", 135214],
    ["2019-04-21T07:22:00.000Z", 98806],
    ["2019-04-21T08:22:00.000Z", 87843],
    ["2019-04-21T09:22:00.000Z", 109081],
    ["2019-04-21T10:22:00.000Z", 197232],
    ["2019-04-21T11:22:00.000Z", 317029],
    ["2019-04-21T12:22:00.000Z", 411743],
    ["2019-04-21T13:22:00.000Z", 494283]
  ];

  return (
    <div style={{ width: "80%", display: "inline-block" }}>
      <SliderChart data={data} onBrush={() => undefined} defaultSize />;
    </div>
  );
}
export {
  Loading,
  Date,
  SI,
  Table,
  Notifier,
  ErrorTest,
  PNF,
  MetricCard,
  Chart
};

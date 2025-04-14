import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Progress } from "./components/ui/progress";
import { stringify } from "csv-stringify/browser/esm";
import { isError } from "./lib/utils";
import {
  downloadContracts,
  downloadGrants,
  downloadLeases,
  PagesPayload,
} from "./lib/download";
import { Loader } from "lucide-react";

const App = () => {
  const [isDownloadingGrant, setIsDownloadingGrant] = useState(false);
  const [isDownloadingContracts, setIsDownloadingContracts] = useState(false);
  const [isDownloadingLeases, setIsDownloadingLeases] = useState(false);
  const [pagesToDownload, setPagesToDownload] = useState(0);
  const [pagesDownloaded, setPagesDownloaded] = useState(0);
  const [downloadError, setDownloadError] = useState("");

  useEffect(() => {
    document.addEventListener(
      "totalPages",
      (e) => {
        const customEvent = e as CustomEvent<PagesPayload>;
        setPagesToDownload(customEvent.detail.value);
      },
      false
    );
    document.addEventListener(
      "downloadedPages",
      (e) => {
        const customEvent = e as CustomEvent<PagesPayload>;
        setPagesDownloaded(customEvent.detail.value);
      },
      false
    );
  }, []);

  const generateGrantCSV = async () => {
    if (isDownloadingGrant) {
      return;
    }
    setDownloadError("");
    setIsDownloadingGrant(true);

    const grants = await downloadGrants();
    if (isError(grants)) {
      setDownloadError(grants.message);
      setIsDownloadingGrant(false);
      return;
    }
    generateDownloadFile(grants, "grants.csv");
    setIsDownloadingGrant(false);
    setPagesToDownload(0);
  };

  const generateContractsCSV = async () => {
    if (isDownloadingContracts) {
      return;
    }
    setDownloadError("");
    setIsDownloadingContracts(true);

    const contracts = await downloadContracts();
    if (isError(contracts)) {
      setDownloadError(contracts.message);
      setIsDownloadingContracts(false);
      return;
    }
    generateDownloadFile(contracts, "contracts.csv");
    setIsDownloadingContracts(false);
    setPagesToDownload(0);
  };

  const generateLeasesCSV = async () => {
    if (isDownloadingLeases) {
      return;
    }
    setDownloadError("");
    setIsDownloadingLeases(true);

    const leases = await downloadLeases();
    if (isError(leases)) {
      setDownloadError(leases.message);
      setIsDownloadingLeases(false);
      return;
    }
    generateDownloadFile(leases, "leases.csv");
    setIsDownloadingLeases(false);
    setPagesToDownload(0);
  };

  const generateDownloadFile = (data: any, filename: string) => {
    stringify(data, { header: true }, (_, output) => {
      const blob = new Blob([output], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const isDownloading =
    isDownloadingGrant || isDownloadingContracts || isDownloadingLeases;

  return (
    <main className="m-8 text-center">
      <h1 className="text-4xl mb-8">DOGE API Download Tool</h1>
      <p className="mb-4">
        Downloads the Data from{" "}
        <a className="text-blue-400" href="https://doge.gov/" target="_blank">
          Department of Government Efficiency
        </a>{" "}
        using the official{" "}
        <a
          className="text-blue-400"
          href="https://api.doge.gov/docs"
          target="_blank"
        >
          API
        </a>
        .
      </p>
      <div className="flex flex-col gap-4 justify-center mb-8">
        <Button
          className="w-52 ml-auto mr-auto"
          onClick={generateGrantCSV}
          disabled={isDownloading}
        >
          {isDownloading ? <Loader></Loader> : <span>Download Grants</span>}
        </Button>
        <Button
          className="w-52 ml-auto mr-auto"
          onClick={generateContractsCSV}
          disabled={isDownloading}
        >
          {isDownloading ? <Loader></Loader> : <span>Download Contracts</span>}
        </Button>
        <Button
          className="w-52 ml-auto mr-auto"
          onClick={generateLeasesCSV}
          disabled={isDownloading}
        >
          {isDownloading ? <Loader></Loader> : <span>Download Leases</span>}
        </Button>
      </div>
      {downloadError ? (
        <p className="font-bold text-red-500 mb-8">{downloadError}</p>
      ) : null}
      {pagesToDownload !== 0 ? (
        <Progress value={(100 / pagesToDownload) * pagesDownloaded} />
      ) : null}
    </main>
  );
};

export default App;

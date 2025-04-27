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
  SimpleError,
} from "./lib/download";
import { Github, Linkedin, Loader } from "lucide-react";
import { Contract, Grant, Lease } from "./lib/typing";

const App = () => {
  const [isDownloading, setIsDownloading] = useState(false);
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

  async function generateCSV<T>(
    filename: string,
    downloadFN: () => Promise<SimpleError | T[]>
  ) {
    if (isDownloading) {
      return;
    }
    setDownloadError("");
    setIsDownloading(true);

    const result = await downloadFN();
    if (isError(result)) {
      setDownloadError(result.message);
      setIsDownloading(false);
      return;
    }
    generateDownloadFile(result, filename);
    setIsDownloading(false);
    setPagesToDownload(0);
  }

  function generateDownloadFile(data: any, filename: string) {
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
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="m-8 text-center">
        <h1 className="text-4xl mb-8">DOGE API Download Tool</h1>
        <p className="mb-8 max-w-md mx-auto">
          Fetch data directly from the{" "}
          <a className="text-blue-400" href="https://doge.gov/" target="_blank">
            Department of Government Efficiency's
          </a>{" "}
          official{" "}
          <a
            className="text-blue-400"
            href="https://api.doge.gov/docs"
            target="_blank"
          >
            API
          </a>
          . Choose an endpoint and download a CSV file, ready to use in any
          spreadsheet program.
        </p>
        <div className="flex flex-col gap-4 justify-center mb-8">
          <Button
            className="w-52 ml-auto mr-auto"
            onClick={() =>
              generateCSV<Grant>("grants.csv", () => downloadGrants())
            }
            disabled={isDownloading}
          >
            {isDownloading ? <Loader></Loader> : <span>Download Grants</span>}
          </Button>
          <Button
            className="w-52 ml-auto mr-auto"
            onClick={() =>
              generateCSV<Contract>("contracts.csv", () => downloadContracts())
            }
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader></Loader>
            ) : (
              <span>Download Contracts</span>
            )}
          </Button>
          <Button
            className="w-52 ml-auto mr-auto"
            onClick={() =>
              generateCSV<Lease>("leases.csv", () => downloadLeases())
            }
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
      <footer className="flex bg-black justify-center p-4 gap-8 mt-auto">
        <a
          className="text-white"
          href="https://www.linkedin.com/in/severin-bucher-21a321276/"
          target="_blank"
        >
          <Linkedin size={40} />
        </a>
        <a
          className="text-white"
          href="https://github.com/richi0/DogeDownloadTool"
          target="_blank"
        >
          <Github size={40} />
        </a>
      </footer>
    </div>
  );
};

export default App;

import { Contract, Grant, Lease, ListResponse, Payment } from "./typing";

export type SimpleError = {
  message: string;
  status: number;
};

export type PagesPayload = {
  value: number;
};

export async function downloadAllPagesGrants<T>(
  url: string,
  resultField: "grants" | "contracts" | "leases" | "payments",
): Promise<T[] | SimpleError> {
  const result: T[] = [];
  try {
    const firstPageResponse = await fetch(`${url}?per_page=500`);
    if (firstPageResponse.status != 200) {
      return {
        message: "Problems fetching data from the api, try again.",
        status: firstPageResponse.status,
      };
    }
    const firstPageData = (await firstPageResponse.json()) as ListResponse;
    const pages = firstPageData.meta.pages;
    const pagesEvent = new CustomEvent<PagesPayload>("totalPages", {
      detail: { value: pages },
    });
    document.dispatchEvent(pagesEvent);
    if (pages === 1) {
      return firstPageData.result[resultField] as T[];
    }
    result.push(...(firstPageData.result[resultField] as T[]));
    let pageCount = 2;
    while (pageCount <= pages) {
      const pageResponse = await fetch(url + `?page=${pageCount}&per_page=500`);
      const pageData = (await pageResponse.json()) as ListResponse;
      result.push(...(pageData.result[resultField] as T[]));
      const pagesEvent = new CustomEvent<PagesPayload>("downloadedPages", {
        detail: { value: pageCount },
      });
      document.dispatchEvent(pagesEvent);
      pageCount++;
    }
  } catch {
    return { message: "Could not fetch api page, try again.", status: 500 };
  }
  return result;
}

export async function downloadGrants() {
  const url = "https://api.doge.gov/savings/grants";
  const result = await downloadAllPagesGrants<Grant>(url, "grants");
  return result;
}

export async function downloadContracts() {
  const url = "https://api.doge.gov/savings/contracts";
  const result = await downloadAllPagesGrants<Contract>(url, "contracts");
  return result;
}

export async function downloadLeases() {
  const url = "https://api.doge.gov/savings/leases";
  const result = await downloadAllPagesGrants<Lease>(url, "leases");
  return result;
}

export async function downloadPayments() {
  const url = "https://api.doge.gov/payments";
  const result = await downloadAllPagesGrants<Payment>(url, "payments");
  return result;
}

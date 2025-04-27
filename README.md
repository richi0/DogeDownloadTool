# DOGE API Download Tool

The [**DOGE API Download Tool**](https://dogedownloadtool.pages.dev/) is a React-based web application that allows users to fetch data from the [Department of Government Efficiency's (DOGE)](https://doge.gov/) official API and download it as CSV files. This tool is designed to make it easy to retrieve and work with government data in spreadsheet programs.

## Features

- Fetch data from the DOGE API endpoints:
  - Grants
  - Contracts
  - Leases
- Download the data as CSV files.
- Real-time progress tracking for multi-page downloads.
- Error handling and user-friendly feedback.
- Responsive and accessible UI built with Tailwind CSS.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **TypeScript**: Strongly typed JavaScript for better code quality.
- **Vite**: Fast development server and build tool.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Radix UI**: Accessible UI primitives for components like progress bars.
- **CSV Stringify**: Library for converting data to CSV format.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/richi0/DogeDownloadTool.git
   cd DogeDownloadTool
   bun install
   bun dev
   ```

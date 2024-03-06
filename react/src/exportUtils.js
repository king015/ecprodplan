export const exportToCSV = (data, filename) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.error("No data provided for CSV export.");
        return;
    }

    const csv = convertDataToCSV(data);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", filename);

        link.click();
    } else {
        console.error("File download not supported in this browser.");
    }
};

export const exportToExcel = (data, filename) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.error("No data provided for Excel export.");
        return;
    }

    const excel = convertDataToExcel(data);

    const blob = new Blob([excel], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    if (link.download !== undefined) {
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", filename);

        link.click();
    } else {
        console.error("File download not supported in this browser.");
    }
};

const convertDataToCSV = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.error("No data provided for CSV conversion.");
        return "";
    }

    const header = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(","));

    return `${header}\n${rows.join("\n")}`;
};

const convertDataToExcel = (data) => {
    console.log("Converting data to Excel format:", data);
};

import jsPDF from "jspdf";

export const generatePDF = (clientDetails) => {
    const { address, name, dateOfBirth, gender, premium, coverageAmount, duration } = clientDetails;

    const doc = new jsPDF();

    // Add the content
    doc.setFontSize(16);
    doc.text("Insurance Policy", 20, 20);

    doc.setFontSize(12);
    doc.text(`Insured Address: ${address}`, 20, 30);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Date of Birth: ${dateOfBirth}`, 20, 50);
    doc.text(`Gender: ${gender}`, 20, 60);
    doc.text(`Premium: ${premium}`, 20, 70);
    doc.text(`Coverage Amount: ${coverageAmount}`, 20, 80);
    doc.text(`Duration: ${duration} days`, 20, 90);

    // Include the rest of the policy details here

    // Save the PDF
    doc.save("InsurancePolicy.pdf");
};

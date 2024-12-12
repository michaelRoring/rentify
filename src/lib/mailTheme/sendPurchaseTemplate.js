import { convertPriceToCurrency } from "@/utils/convertPriceToCurrency";

export function sendPurchaseTemplate(
  customerName,
  customerWalletAddress,
  senderName,
  senderContact,
  senderEmail,
  trsanctionURL,
  item,
) {

  return (`
    <div>
			<div>Dear ${customerName} [address: ${customerWalletAddress}]</div>
			<br>
			<br>
      <div>We are pleased to inform you that your purchase at Rentify platform has been successful. Here are the details of your purchase:</div>
			<br>
      <div>Name: ${item.name}</div>
      <div>Type: ${item.types}</div>
      <div>vCPUs: ${item.vCPUs} vCPUs [${item.vCPUsUnit} unit]</div>
      <div>Bandwith: ${item.bandwidth} TB</div>
      <div>Price: ${item.price} ${item.symbol.symbolFrom}</div>
			<br>
      <div>We will process your purchase within the next 24 hours. Here's your proof of transaction:</div>
      <div><a href="${trsanctionURL}" target="_blank" rel="noopener">${trsanctionURL}</a></div>
			<br>
      <div>Thank you for shopping at Rentify platform.  We hope you are satisfied with your purchase and look forward to serving you again in the future.</div>
			<br>
      <div>If you have any questions or require further assistance, please feel free to contact our customer support team.</div>
			<br>
			<br>
      <div>${senderName} - Rentify</div>
			<br>
      <div>Whatsapp: <a href="wa.me/${senderContact}" target="_blank" rel="noopener">+${senderContact}</a></div>
      <div>Email: <a href="mailto:${senderEmail}" target="_blank" rel="noopener">${senderEmail}</a></div>
		</div>
  `)
}
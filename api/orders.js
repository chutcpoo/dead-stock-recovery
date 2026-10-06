const OFFERS=new Set(["lead_followup","marketplace_profit","ar_collection"]);
function clean(v,n){return v?String(v).trim().slice(0,n):null}
function orderId(){const t=Date.now().toString(36).toUpperCase();const r=Math.random().toString(36).slice(2,8).toUpperCase();return "PC-"+t+"-"+r}
export default async function handler(req,res){
 res.setHeader("Cache-Control","no-store");
 if(req.method!=="POST"){res.setHeader("Allow","POST");return res.status(405).json({error:"method_not_allowed"})}
 let b=req.body||{};if(typeof b==="string"){try{b=JSON.parse(b)}catch{b={}}}
 const offer=clean(b.offer,50),contact=clean(b.contact,120),business=clean(b.business,120);
 if(!OFFERS.has(offer)||!contact)return res.status(400).json({error:"invalid_order"});
 const id=orderId(), amountSatangs=99000, status="PAYMENT_PENDING";
 console.log(JSON.stringify({event:"order_created",orderId:id,offer,amountSatangs,status,contact,business,utm_source:clean(b.utm_source,100),utm_campaign:clean(b.utm_campaign,140),utm_content:clean(b.utm_content,140),at:new Date().toISOString()}));
 return res.status(201).json({orderId:id,offer,amountSatangs,amountDisplay:"฿990",currency:"THB",status});
}
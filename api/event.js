const ALLOWED = new Set(["dead_stock_view","dead_stock_scan","dead_stock_report","dead_stock_intent"]);
export default async function handler(req,res){
  res.setHeader("Cache-Control","no-store");
  if(req.method!=="POST"){res.setHeader("Allow","POST");return res.status(405).end();}
  let body=req.body||{}; if(typeof body==="string"){try{body=JSON.parse(body)}catch{body={}}}
  const tool=String(body.tool||""); if(!ALLOWED.has(tool)) return res.status(400).json({ok:false,error:"invalid_event"});
  const clean=(v,n)=>v?String(v).slice(0,n):null;
  const evt={event:"dead_stock_validation",tool,sourcePath:clean(body.sourcePath,180),utm_source:clean(body.utm_source,120),utm_medium:clean(body.utm_medium,120),utm_campaign:clean(body.utm_campaign,160),utm_content:clean(body.utm_content,160),event_id:clean(body.event_id,120),at:new Date().toISOString()};
  console.log(JSON.stringify(evt)); return res.status(204).end();
}
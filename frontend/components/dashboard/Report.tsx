import { Calendar } from "lucide-react";

export default function ReportCard(){

return(

<div className="bg-white rounded-[36px] p-8 shadow">

<div className="flex justify-between">

<div className="flex gap-6">

<div className="w-24 h-24 rounded-3xl bg-gray-100"/>

<div>

<h2 className="text-3xl font-bold">
Waterlogging
</h2>

<div className="flex gap-4 mt-3 text-gray-500">

<span className="flex gap-2">
<Calendar size={18}/>
27 June
</span>

<span>Water</span>

<span className="text-violet-600">
Medium
</span>

</div>

</div>

</div>

<div className="flex gap-4 items-center">

<span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
OPEN
</span>

<button className="bg-violet-600 text-white px-6 py-4 rounded-2xl">
Fast Track
</button>

</div>

</div>

</div>

);

}
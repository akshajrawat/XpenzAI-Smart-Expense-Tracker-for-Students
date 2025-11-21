import { Card } from "@/components/ui/card";

const page = () => {
  return (
    <div className="p-2">
      {/* top container */}
      <div>
        {/* wallet container */}
        <div>
          <p className="font-medium text-lg ml-1">My Wallet </p>
          {/* wallet card */}
          <Card className="flex justify-center items-center h-46">
            <p className="text-4xl">0.00 $</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;

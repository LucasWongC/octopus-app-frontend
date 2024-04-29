"use client";

import { useCurrentTime } from "@/contexts/CurrentTimeContext";
import { getTransaction } from "@/helpers/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { key } = useParams<{ key: string }>();
  const [tx, setTx] = useState<Transaction>();
  const now = useCurrentTime();

  useEffect(() => {
    if (!key || tx?.status == "Finished") {
      return;
    }

    getTransaction(key).then(setTx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, now]);

  return <div className="w-full flex flex-col"></div>;
}

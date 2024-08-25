import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../../providers/context/app-context";
import { useQueryRequest } from "../../../providers/hooks/use-query-request";

export function Project() {
  const {} = useQueryRequest();

  const params = useParams();
  return <div>Project</div>;
}

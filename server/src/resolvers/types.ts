type Method = "Query" | "Mutation";
export type ResolverType = {
  [k: string]: {
    [key: string]: (
      parent: any,
      args: { [key: string]: any },
      context: {},
      info: any
    ) => any;
  };
};

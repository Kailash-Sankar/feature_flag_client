// utilites for store
export const applyScope = (scope, types) => Object.fromEntries(
    types.map( type => [type, `${scope}/${type}`])
);
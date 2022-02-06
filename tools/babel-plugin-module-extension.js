const transformExt = (rules, node) => {
  if (!node) return;
  const originExts = Object.keys(rules);
  for (const originExt of originExts) {
    const originExtRegx = new RegExp(`\\.${originExt}$`);
    const replaceValue = rules[originExt] ? `.${rules[originExt]}` : '';
    const value = node.value.replace(originExtRegx, replaceValue);
    if (value !== node.value) {
      node.value = value;
      break;
    }
  }
};

module.exports = () => {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        transformExt(state.opts, path.node.source);
      },
      ExportNamedDeclaration(path, state) {
        transformExt(state.opts, path.node.source);
      },
    },
  };
};

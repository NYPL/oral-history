var wysihtml5ParserRules = {
  tags: {
    strong: {},
    b:      {},
    i:      {},
    em:     {},
    br:     {},
    p:      {},
    small:  {},
    a:      {
      "check_attributes": {
        "href": "href"
      }
    }
  }
};
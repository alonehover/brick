export const filterImageShow = cssurl => {
    if(cssurl) {
        // eslint-disable-next-line no-useless-escape
        return cssurl.match(/url\((\S*[^\)])\)/)[1];
    }
};

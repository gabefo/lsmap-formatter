(function () {
    "use-strict";

    const regex = /(\w+)(#\d{4})? - (@\d+) - \d+ - \d+% - (P\d{1,2})/;
    const categories = [{
        category: "P0",
        name: "Normal",
        color: "#ACA99F",
        icon: "http://i.imgur.com/AjcGgyx.png"
    }, {
        category: "P1",
        name: "Protected",
        color: "#FCD46E",
        icon: "http://i.imgur.com/dnuppaW.png"
    }, {
        category: "P2",
        name: "Prime",
        color: "#E9BA5C",
        icon: "http://i.imgur.com/0xHDJfs.png"
    }, {
        category: "P3",
        name: "Prime Bootcamp",
        color: "#A19A6C",
        icon: "http://i.imgur.com/KQmIe6z.png"
    }, {
        category: "P4",
        name: "Shaman",
        color: "#95D9D6",
        icon: "http://i.imgur.com/W2DuMvz.png"
    }, {
        category: "P5",
        name: "Art",
        color: "#D16C41",
        icon: "http://i.imgur.com/JefkO6b.png"
    }, {
        category: "P6",
        name: "Mechanism",
        color: "#DBDBDB",
        icon: "http://i.imgur.com/EyQAQ10.png"
    }, {
        category: "P7",
        name: "No Shaman",
        color: "#E9E9E9",
        icon: "http://i.imgur.com/RV32jmm.png"
    }, {
        category: "P8",
        name: "Dual Shaman",
        color: "#C9C0E4",
        icon: "http://i.imgur.com/DoACCNh.png"
    }, {
        category: "P9",
        name: "Miscellaneous",
        color: "#E9BA5C",
        icon: "http://i.imgur.com/PYRguTf.png"
    }, {
        category: "P10",
        name: "Survivor",
        color: "#7C7C7C",
        icon: "http://i.imgur.com/UytFMU1.png"
    }, {
        category: "P11",
        name: "Vampire Survivor",
        color: "#AC3736",
        icon: "http://i.imgur.com/44zz3dC.png"
    }, {
        category: "P13",
        name: "Normal Bootcamp",
        color: "#A19A6C",
        icon: "https://i.imgur.com/cDoeahw.png"
    }, {
        category: "P17",
        name: "Racing",
        color: "#CA8A7F",
        icon: "http://i.imgur.com/ouplMc9.png"
    }, {
        category: "P18",
        name: "Defilante",
        color: "#84D329",
        icon: "http://i.imgur.com/8bEFPBE.png"
    }, {
        category: "P19",
        name: "Music",
        color: "#9FAAB2",
        icon: "http://img.atelier801.com/8124f166.png"
    }, {
        category: "P20",
        name: "Survivor Test",
        color: "#7C7C7C",
        icon: "https://i.imgur.com/Jn9kasE.png"
    }, {
        category: "P21",
        name: "Vampire Survivor Test",
        color: "#AC3736",
        icon: "https://i.imgur.com/r7WCgrw.png"
    }, {
        category: "P22",
        name: "Tribe House",
        color: "#937456",
        icon: "http://i.imgur.com/Lxvjj1M.png"
    }, {
        category: "P23",
        name: "Bootcamp Test",
        color: "#A19A6C",
        icon: "https://i.imgur.com/XbWF6Vl.png"
    }, {
        category: "P24",
        name: "Dual Shaman Survivor",
        color: "#7C7C7C",
        icon: "https://i.imgur.com/FeAHBd8.png"
    }, {
        category: "P32",
        name: "Dual Shaman Test",
        color: "#C9C0E4",
        icon: "http://i.imgur.com/DoACCNh.png"
    }, {
        category: "P34",
        name: "Dual Shaman Survivor Test",
        color: "#7C7C7C",
        icon: "https://i.imgur.com/rSYEyN2.png"
    }, {
        category: "P38",
        name: "Racing Test",
        color: "#CA8A7F",
        icon: "http://i.imgur.com/ouplMc9.png"
    }, {
        category: "P41",
        name: "Module",
        color: "#009D9D",
        icon: "https://i.imgur.com/t7Q9764.png"
    }, {
        category: "P42",
        name: "No Shaman Test",
        color: "#E9E9E9",
        icon: "https://i.imgur.com/pEDfChK.png"
    }, {
        category: "P43",
        name: "High Deleted",
        color: "#FA6A40",
        icon: "http://i.imgur.com/BLabBxr.png"
    }, {
        category: "P44",
        name: "Deleted",
        color: "#FA6A40",
        icon: "http://i.imgur.com/BLabBxr.png"
    }, {
        category: "P66",
        name: "Thematic",
        color: "#009D9D",
        icon: "https://i.imgur.com/qDuwui5.png"
    }];
    const options = {
        showCategoryIcon: true,
        showCategoryCode: true,
        showCategoryName: false,
        showMapCount: true,
        all: true,
        P0: true,
        P1: true,
        P2: true,
        P3: true,
        P4: true,
        P5: true,
        P6: true,
        P7: true,
        P8: true,
        P9: true,
        P10: true,
        P11: true,
        P13: true,
        P17: true,
        P18: true,
        P19: true,
        P20: true,
        P21: true,
        P22: true,
        P23: true,
        P24: true,
        P32: true,
        P34: true,
        P38: true,
        P41: true,
        P42: true,
        P43: true,
        P44: true,
        P66: true
    };

    function readFile(file) {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function () {
                resolve(this.result);
            };
            reader.onerror = function () {
                reject("error reading file");
            };
        });
    }

    function readLine(text, callback) {
        const regex = /\r\n|\n|\r/g;
        let lineIndex = 0;
        let start = 0;
        let match;
        while ((match = regex.exec(text)) !== null) {
            callback(text.slice(start, match.index), lineIndex);
            start = regex.lastIndex;
            lineIndex++;
        }
        callback(text.slice(start), lineIndex);
    }

    function removeChildren(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.lastChild);
        }
    }

    function addTextArea(parent, value) {
        const container = document.createElement("div");
        container.classList.add("textarea-container", "has-copy-button");
        const textarea = document.createElement("textarea");
        textarea.readOnly = true;
        textarea.value = value;
        container.appendChild(textarea);
        const copyButton = document.createElement("div");
        copyButton.classList.add("button-icon", "copy-button");
        copyButton.addEventListener("click", function () {
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);
            document.execCommand("copy");
        });
        container.appendChild(copyButton);
        parent.appendChild(container);
    }

    function addCheckbox(parent, labelText, value) {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = value;
        checkbox.checked = options[value];
        checkbox.addEventListener("change", checkboxChangeEventHandler);
        label.appendChild(checkbox);
        const text = document.createTextNode(labelText);
        label.appendChild(text);
        parent.appendChild(label);
        return checkbox;
    }

    function checkboxChangeEventHandler() {
        options[this.value] = this.checked;
    }

    window.addEventListener("load", function () {
        const source = document.getElementById("source");
        const results = document.getElementById("results");

        const optionsContainer = document.getElementById("options");

        addCheckbox(optionsContainer, "Show category Icon", "showCategoryIcon");
        addCheckbox(optionsContainer, "Show category code", "showCategoryCode");
        addCheckbox(optionsContainer, "Show category name", "showCategoryName");
        addCheckbox(optionsContainer, "Show map count", "showMapCount");

        const categoryContainer = document.getElementById("categories");
        const categoryCheckboxList = [];
        
        addCheckbox(categoryContainer, "All", "all").addEventListener("change", function () {
            const checked = this.checked;
            for (let i = 0; i < categoryCheckboxList.length; i++) {
                const checkbox = categoryCheckboxList[i];
                checkbox.checked = options[checkbox.value] = checked;
            }
        });

        for (let i = 0; i < categories.length; i++) {
            const categoryInfo = categories[i];
            const category = categoryInfo.category;
            categoryCheckboxList.push(addCheckbox(categoryContainer, category + " - " + categoryInfo.name, category));
        }

        document.getElementById("file-selector").addEventListener("change", function () {
            readFile(this.files[0]).then(function (value) {
                source.value = value;
            });
        });

        document.getElementById("format").addEventListener("click", function () {
            removeChildren(results);

            const mapsByCategory = {};

            readLine(source.value, function (line) {
                const match = regex.exec(line);
                if (match === null) {
                    return;
                }

                const owner = match[1] + (match[2] || "#0000");
                const code = match[3];
                const category = match[4];

                if (!mapsByCategory[category]) {
                    mapsByCategory[category] = [];
                }

                mapsByCategory[category].push({ owner, code, category });
            });

            let bbcode = "[table align=center][row]";

            for (let i = 0, cols = 0; i < categories.length; i++) {
                const categoryInfo = categories[i];
                const category = categoryInfo.category;

                if (options[category] && mapsByCategory[category]) {
                    if (cols === 5) {
                        bbcode += "[/row][row]";
                        cols = 0;
                    }

                    cols++;

                    bbcode += "[cel][spoiler";

                    let text = "";

                    if (options.showCategoryCode) {
                        text += category;
                    }

                    if (options.showCategoryName) {
                        if (text) {
                            text += " - ";
                        }
                        text += categoryInfo.name;
                    }

                    if (options.showMapCount) {
                        if (text) {
                            text += " ";
                        }
                        text += "(" + mapsByCategory[category].length + ")";
                    }

                    if (text) {
                        text = "[color=" + categoryInfo.color + "][b]" + text + "[/b][/color]";
                    }

                    if (options.showCategoryIcon) {
                        const img = "[img]" + categoryInfo.icon + "[/img]";
                        text = text ? img + " " + text : img;
                    }
                    
                    if (text) {
                        bbcode += "=" + text;
                    }

                    bbcode += "]" + mapsByCategory[category].reduce(function (result, map) {
                        return result += "\n" + map.code;
                    }, "") + "[/spoiler][/cel]";
                }
            }
            
            bbcode += "[/row][row][cel colspan=5][p=right][size=12]Feito com [url=https://gabefo.github.io/lsmap2bbcode/]Lsmap Formatter[/url][/size][/p][/cel][/row][/table]";
            
            addTextArea(results, bbcode);
        });
    });
})();

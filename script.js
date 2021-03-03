(function () {
    "use-strict";

    const searchParams = new URL(document.location).searchParams;
    const mod = searchParams.get("mod") === "1";
    const MAX_TABS = +searchParams.get("t") || (mod ? 7 : 9999);
    const MAX_COLS = +searchParams.get("c") || 5;

    const regex = /(\w+)(#\d{4})? - @(\d+) - \d+ - \d+% - (P\d{1,2})/;
    const categories = [{
        id: "P0",
        name: "Normal",
        color: "#ACA99F",
        icon: "http://i.imgur.com/AjcGgyx.png"
    }, {
        id: "P1",
        name: "Protected",
        color: "#FCD46E",
        icon: "http://i.imgur.com/dnuppaW.png"
    }, {
        id: "P2",
        name: "Prime",
        color: "#E9BA5C",
        icon: "http://i.imgur.com/0xHDJfs.png"
    }, {
        id: "P3",
        name: "Bootcamp",
        color: "#A19A6C",
        icon: "http://i.imgur.com/KQmIe6z.png"
    }, {
        id: "P4",
        name: "Shaman",
        color: "#95D9D6",
        icon: "http://i.imgur.com/W2DuMvz.png"
    }, {
        id: "P5",
        name: "Art",
        color: "#D16C41",
        icon: "http://i.imgur.com/JefkO6b.png"
    }, {
        id: "P6",
        name: "Mechanism",
        color: "#DBDBDB",
        icon: "http://i.imgur.com/EyQAQ10.png"
    }, {
        id: "P7",
        name: "No Shaman",
        color: "#E9E9E9",
        icon: "http://i.imgur.com/RV32jmm.png"
    }, {
        id: "P8",
        name: "Dual Shaman",
        color: "#C9C0E4",
        icon: "http://i.imgur.com/DoACCNh.png"
    }, {
        id: "P9",
        name: "Miscellaneous",
        color: "#E9BA5C",
        icon: "http://i.imgur.com/PYRguTf.png"
    }, {
        id: "P10",
        name: "Survivor",
        color: "#7C7C7C",
        icon: "http://i.imgur.com/UytFMU1.png"
    }, {
        id: "P11",
        name: "Vampire Survivor",
        color: "#AC3736",
        icon: "http://i.imgur.com/44zz3dC.png"
    }, {
        id: "P13",
        name: "Bootcamp",
        color: "#A19A6C",
        icon: "http://i.imgur.com/KQmIe6z.png"
    }, {
        id: "P17",
        name: "Racing",
        color: "#CA8A7F",
        icon: "http://i.imgur.com/ouplMc9.png"
    }, {
        id: "P18",
        name: "Defilante",
        color: "#84D329",
        icon: "http://i.imgur.com/8bEFPBE.png"
    }, {
        id: "P19",
        name: "Music",
        color: "#9FAAB2",
        icon: "http://img.atelier801.com/8124f166.png"
    }, {
        id: "P20",
        name: "Survivor Test",
        color: "#7C7C7C",
        icon: "http://i.imgur.com/UytFMU1.png"
    }, {
        id: "P21",
        name: "Vampire Survivor Test",
        color: "#AC3736",
        icon: "http://i.imgur.com/44zz3dC.png"
    }, {
        id: "P22",
        name: "Tribe House",
        color: "#937456",
        icon: "http://i.imgur.com/Lxvjj1M.png"
    }, {
        id: "P23",
        name: "Bootcamp Test",
        color: "#A19A6C",
        icon: "http://i.imgur.com/KQmIe6z.png"
    }, {
        id: "P24",
        name: "Dual Shaman Survivor",
        color: "#7C7C7C",
        icon: "http://img.atelier801.com/80a4f166.png"
    }, {
        id: "P32",
        name: "Dual Shaman Test",
        color: "#C9C0E4",
        icon: "http://i.imgur.com/DoACCNh.png"
    }, {
        id: "P34",
        name: "Dual Shaman Survivor Test",
        color: "#7C7C7C",
        icon: "http://img.atelier801.com/80a4f166.png"
    }, {
        id: "P38",
        name: "Racing Test",
        color: "#CA8A7F",
        icon: "http://i.imgur.com/pUB90w0.png"
    }, {
        id: "P41",
        name: "Module",
        color: "#009D9D",
        icon: "http://i.imgur.com/GmbpOc6.png"
    }, {
        id: "P42",
        name: "No Shaman Test",
        color: "#E9E9E9",
        icon: "http://i.imgur.com/RV32jmm.png"
    }, {
        id: "P43",
        name: "High Deleted",
        color: "#FA6A40",
        icon: "http://i.imgur.com/BLabBxr.png"
    }, {
        id: "P44",
        name: "Deleted",
        color: "#FA6A40",
        icon: "http://i.imgur.com/BLabBxr.png"
    }, {
        id: "P66",
        name: "Themed",
        color: "#009D9D",
        icon: "https://i.imgur.com/MXiAziJ.png"
    }];
    const categoriesById = categories.reduce(function (obj, category) {
        obj[category.id] = category;
        return obj;
    }, {});
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
        const length = text.length;
        let start = 0;
        let end;
        while (start < length) {
            end = text.indexOf("\n", start);
            if (end === -1) {
                end = length;
            }
            callback(text.slice(start, end));
            start = end + 1;
        }
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

        function addTextArea(value) {
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
            results.appendChild(container);
        }

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
            const category = categories[i];
            const categoryId = category.id;
            categoryCheckboxList.push(addCheckbox(categoryContainer, categoryId + " - " + category.name, categoryId));
        }

        document.getElementById("file-selector").addEventListener("change", function () {
            const files = this.files;
            const totalFiles = files.length;
            if (totalFiles > 0) {
                const promises = [];
                for (let i = 0; i < totalFiles; i++) {
                    promises.push(readFile(files[i]));
                }
                Promise.all(promises).then(function (values) {
                    source.value = values.join("\n");
                });
            }
        });

        document.getElementById("format").addEventListener("click", function () {
            results.innerHTML = "";

            const maps = {};
            const authors = new Set();

            readLine(source.value, function (line) {
                const match = regex.exec(line);
                if (match === null) {
                    return;
                }

                const author = match[1] + (match[2] || "#0000");
                const code = match[3];
                const category = match[4];

                if (!maps[category]) {
                    maps[category] = {};
                }

                if (!maps[category][author]) {
                    maps[category][author] = [];
                }

                maps[category][author].push({ code, author, category });

                authors.add(author);
            });

            let bbcode;

            if (mod) {
                [["P1", "P2", "P3", "P4", "P5"], ["P6", "P7", "P8", "P9", "P10"], ["P11", "P13", "P17", "P18", "P24"]].forEach(function (categorySet) {
                    bbcode = "[p=center][size=30][color=#EDCC8D]CATEGORIAS[/color][/size]\n\nLista de mapas das categorias " + categorySet.join(", ") + "[/p]";

                    for (let i = 0; i < categorySet.length; i++) {
                        const category = categoriesById[categorySet[i]];
                        const categoryId = category.id;

                        if (options[categoryId]) {
                            const ranking = Object.entries(maps[categoryId] || []).map(function (value) {
                                return {
                                    author: value[0],
                                    totalMaps: value[1].length
                                };
                            }).sort(function (a, b) {
                                return b.totalMaps - a.totalMaps;
                            });

                            bbcode += "\n[p=center][img]" + category.icon + "[/img] [color=" + category.color + "][b]" + category.name + "[/b][/color][/p][table align=center][row][cel][spoiler=Ranking]";

                            for (let j = 0; j < 9; j++) {
                                bbcode += "\n#" + (j + 1) + " " + (ranking[j] ? ranking[j].author + " (" + ranking[j].totalMaps + ")" : "-");
                            }

                            bbcode += "[/spoiler][/cel][cel][spoiler=Mapas]" + [].concat(...Object.values(maps[categoryId] || [])).sort(function (a, b) {
                                return a.code - b.code;
                            }).reduce(function (result, map) {
                                return result += "\n@" + map.code + " - " + map.author;
                            }, "") + "[/spoiler][/cel][/row][/table]";
                        }
                    }

                    addTextArea(bbcode);
                });
            }

            bbcode = "";

            let n = 0;

            for (const author of authors) {
                bbcode += "[#" + author + "]";

                if (mod) {
                    bbcode += "[p=center][size=30][color=#EDCC8D]MAPEIROS - " + author + "[/color][/size][/p]\n";
                }

                bbcode += "[table align=center][row]";

                for (let i = 0, cols = 0; i < categories.length; i++) {
                    const category = categories[i];
                    const categoryId = category.id;

                    if (options[categoryId] && maps[categoryId] && maps[categoryId][author]) {
                        if (cols === MAX_COLS) {
                            bbcode += "[/row][row]";
                            cols = 0;
                        }

                        bbcode += "[cel][spoiler=";

                        let separator = "";

                        if (options.showCategoryIcon) {
                            bbcode += "[img]" + category.icon + "[/img]";
                            separator = " ";
                        }

                        bbcode += "[color=" + category.color + "][b]";

                        if (options.showCategoryCode) {
                            bbcode += separator + categoryId;
                            separator = " - ";
                        }

                        if (options.showCategoryName) {
                            bbcode += separator + category.name;
                        }

                        if (separator !== "") {
                            separator = " ";
                        }

                        if (options.showMapCount) {
                            bbcode += separator + "(" + maps[categoryId][author].length + ")";
                        }

                        bbcode += "[/b][/color]]" + maps[categoryId][author].reduce(function (result, map) {
                            return result += "\n@" + map.code;
                        }, "") + "[/spoiler][/cel]";

                        cols++;
                    }
                }
                
                bbcode += "[/row][row][cel colspan=" + MAX_COLS + "][p=right][size=12]Feito com [url=https://gabefo.github.io/lsmap2bbcode/]Lsmap Formatter[/url][/size][/p][/cel][/row][/table][/#" + author + "]";

                if (++n % MAX_TABS === 0) {
                    addTextArea(bbcode);
                    bbcode = "";
                }
            }

            if (bbcode !== "") {
                addTextArea(bbcode);
            }
        });
    });
})();

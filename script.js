(function () {
    "use-strict";

    var regex = /(\w+)(#\d{4})? - (@\d+) - \d+ - \d+% - (P\d{1,2})/;
    var allCategories = [{
        code: "P0",
        name: "Normal",
        color: "#ACA99F",
        icon: "http://i.imgur.com/AjcGgyx.png"
    }, {
        code: "P1",
        name: "Protected",
        color: "#FCD46E",
        icon: "http://i.imgur.com/dnuppaW.png"
    }, {
        code: "P2",
        name: "Prime",
        color: "#E9BA5C",
        icon: "http://i.imgur.com/0xHDJfs.png"
    }, {
        code: "P3",
        name: "Bootcamp",
        color: "#A19A6C",
        icon: "http://i.imgur.com/KQmIe6z.png"
    }, {
        code: "P4",
        name: "Shaman",
        color: "#95D9D6",
        icon: "http://i.imgur.com/W2DuMvz.png"
    }, {
        code: "P5",
        name: "Art",
        color: "#D16C41",
        icon: "http://i.imgur.com/JefkO6b.png"
    }, {
        code: "P6",
        name: "Mechanism",
        color: "#DBDBDB",
        icon: "http://i.imgur.com/EyQAQ10.png"
    }, {
        code: "P7",
        name: "No Shaman",
        color: "#E9E9E9",
        icon: "http://i.imgur.com/RV32jmm.png"
    }, {
        code: "P8",
        name: "Dual Shamans",
        color: "#C9C0E4",
        icon: "http://i.imgur.com/DoACCNh.png"
    }, {
        code: "P9",
        name: "Miscellaneous",
        color: "#E9BA5C",
        icon: "http://i.imgur.com/PYRguTf.png"
    }, {
        code: "P10",
        name: "Survivor",
        color: "#7C7C7C",
        icon: "http://i.imgur.com/UytFMU1.png"
    }, {
        code: "P11",
        name: "Vampire Survivor",
        color: "#AC3736",
        icon: "http://i.imgur.com/44zz3dC.png"
    }, {
        code: "P13",
        name: "Bootcamp",
        color: "#A19A6C",
        icon: "http://i.imgur.com/KQmIe6z.png"
    }, {
        code: "P17",
        name: "Racing",
        color: "#CA8A7F",
        icon: "http://i.imgur.com/ouplMc9.png"
    }, {
        code: "P18",
        name: "Defilante",
        color: "#84D329",
        icon: "http://i.imgur.com/8bEFPBE.png"
    }, {
        code: "P19",
        name: "Music",
        color: "#9FAAB2",
        icon: "http://img.atelier801.com/8124f166.png"
    }, {
        code: "P20",
        name: "Survivor Test",
        color: "#7C7C7C",
        icon: "http://i.imgur.com/UytFMU1.png"
    }, {
        code: "P21",
        name: "Vampire Survivor Test",
        color: "#AC3736",
        icon: "http://i.imgur.com/44zz3dC.png"
    }, {
        code: "P22",
        name: "Tribe House",
        color: "#937456",
        icon: "http://i.imgur.com/Lxvjj1M.png"
    }, {
        code: "P23",
        name: "Bootcamp Test",
        color: "#A19A6C",
        icon: "http://i.imgur.com/KQmIe6z.png"
    }, {
        code: "P24",
        name: "Dual Shaman Survivor",
        color: "#7C7C7C",
        icon: "http://img.atelier801.com/80a4f166.png"
    }, {
        code: "P32",
        name: "Dual Shaman Test",
        color: "#C9C0E4",
        icon: "http://i.imgur.com/DoACCNh.png"
    }, {
        code: "P34",
        name: "Dual Shaman Survivor Test",
        color: "#7C7C7C",
        icon: "http://img.atelier801.com/80a4f166.png"
    }, {
        code: "P38",
        name: "Racing Test",
        color: "#CA8A7F",
        icon: "http://i.imgur.com/pUB90w0.png"
    }, {
        code: "P41",
        name: "Module",
        color: "#009D9D",
        icon: "http://i.imgur.com/GmbpOc6.png"
    }, {
        code: "P42",
        name: "No Shaman Test",
        color: "#E9E9E9",
        icon: "http://i.imgur.com/RV32jmm.png"
    }, {
        code: "P43",
        name: "High Deleted",
        color: "#FA6A40",
        icon: "http://i.imgur.com/BLabBxr.png"
    }, {
        code: "P44",
        name: "Deleted",
        color: "#FA6A40",
        icon: "http://i.imgur.com/BLabBxr.png"
    }, {
        code: "P66",
        name: "Themed",
        color: "#009D9D",
        icon: "http://i.imgur.com/GmbpOc6.png"
    }];
    var options = {
        showCategoryIcon: true,
        showCategoryCode: true,
        showCategoryName: false,
        showMapCount: true,
        P0: false,
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
        P19: false,
        P20: false,
        P21: false,
        P22: false,
        P23: false,
        P24: true,
        P32: false,
        P34: false,
        P38: false,
        P41: false,
        P42: false,
        P43: false,
        P44: false,
        P66: false
    };
    var maxCols = 5;

    function formatText(text) {
        var mapsByAuthor = {};
        readLine(text, function (line) {
            var match = regex.exec(line);
            if (match === null) {
                return;
            }
            var author = match[1] + (match[2] || "#0000");
            var code = match[3];
            var category = match[4];
            var mapsByCategory = mapsByAuthor[author] || (mapsByAuthor[author] = {});
            var maps = mapsByCategory[category] || (mapsByCategory[category] = []);
            maps.push(code);
        });
        var result = "";
        var authors = Object.keys(mapsByAuthor);
        for (var i = 0; i < authors.length; i++) {
            var author = authors[i];
            var mapsByCategory = mapsByAuthor[author];
            result += "[#" + author + "][table align=center][row]";
            for (var j = 0, cols = 0; j < allCategories.length; j++) {
                var category = allCategories[j];
                var categoryCode = category.code;
                if (options[categoryCode]) {
                    var maps = mapsByCategory[categoryCode];
                    if (maps) {
                        if (cols === maxCols) {
                            result += "[/row][row]";
                            cols = 0;
                        }
                        result += "[cel][spoiler=";
                        var separator = "";
                        if (options.showCategoryIcon) {
                            result += "[img]" + category.icon + "[/img]";
                            separator = " ";
                        }
                        result += "[color=" + category.color + "][b]";
                        if (options.showCategoryCode) {
                            result += separator + categoryCode;
                            separator = " - ";
                        }
                        if (options.showCategoryName) {
                            result += separator + category.name;
                        }
                        if (separator !== "") {
                            separator = " ";
                        }
                        if (options.showMapCount) {
                            result += separator + "(" + maps.length + ")";
                        }
                        result += "[/b][/color]]\n" + maps.join("\n") + "[/spoiler][/cel]";
                        cols++;
                    }
                }
            }
            result += "[/row][/table][/#" + author + "]";
        }
        return result;
    };

    function readFile(file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
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
        var length = text.length;
        var start = 0;
        var end;
        while (start < length) {
            end = text.indexOf("\n", start);
            if (end === -1) {
                end = length;
            }
            callback(text.slice(start, end));
            start = end + 1;
        }
    }

    function addCheckbox(container, labelText, value, checked) {
        var label = document.createElement("label");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = value;
        checkbox.checked = checked;
        checkbox.addEventListener("change", checkboxChangeEventHandler);
        label.appendChild(checkbox);
        var text = document.createTextNode(labelText);
        label.appendChild(text);
        container.appendChild(label);
        return checkbox;
    }

    function checkboxChangeEventHandler() {
        options[this.value] = this.checked;
    }

    window.addEventListener("load", function () {
        var source = document.getElementById("source");
        var output = document.getElementById("output");

        var optionsContainer = document.getElementById("options");
        
        addCheckbox(optionsContainer, "Show category Icon", "showCategoryIcon", options.showCategoryIcon);
        addCheckbox(optionsContainer, "Show category code", "showCategoryCode", options.showCategoryCode);
        addCheckbox(optionsContainer, "Show category name", "showCategoryName", options.showCategoryName);
        addCheckbox(optionsContainer, "Show map count", "showMapCount", options.showMapCount);

        var categoryContainer = document.getElementById("categories");
        var categoryCheckboxList = [];

        addCheckbox(categoryContainer, "All", "all", false).addEventListener("change", function () {
            var checked = this.checked;
            for (var i = 0; i < categoryCheckboxList.length; i++) {
                var checkbox = categoryCheckboxList[i];
                checkbox.checked = options[checkbox.value] = checked;
            }
        });

        for (var i = 0; i < allCategories.length; i++) {
            var category = allCategories[i];
            var categoryCode = category.code;
            categoryCheckboxList.push(addCheckbox(categoryContainer, categoryCode + " - " + category.name, categoryCode, options[categoryCode]));
        }

        document.getElementById("file-selector").addEventListener("change", function () {
            var files = this.files;
            var totalFiles = files.length;
            if (totalFiles > 0) {
                var promises = [];
                for (var i = 0; i < totalFiles; i++) {
                    promises.push(readFile(files[i]));
                }
                Promise.all(promises).then(function (values) {
                    source.value = values.join("\n");
                });
            }
        });

        document.getElementById("format").addEventListener("click", function () {
            output.value = formatText(source.value);
        });

        document.getElementById("copy").addEventListener("click", function () {
            output.select();
            output.setSelectionRange(0, source.value.length);
            document.execCommand("copy");
        });
    });
})();

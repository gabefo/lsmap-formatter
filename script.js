(function () {
    "use-strict";

    var regex = /\w+(?:#\d{4})? - (@\d+) - \d+ - \d+% - (P\d{1,2})/;
    var allCategories = ["P0", "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "P13", "P17", "P18", "P19", "P22", "P23", "P24", "P32", "P38", "P41", "P42", "P43", "P44", "P66"];
    var categoryIcons = {
        P0: "http://i.imgur.com/AjcGgyx.png",
        P1: "http://i.imgur.com/dnuppaW.png",
        P2: "http://i.imgur.com/0xHDJfs.png",
        P3: "http://i.imgur.com/KQmIe6z.png",
        P4: "http://i.imgur.com/W2DuMvz.png",
        P5: "http://i.imgur.com/JefkO6b.png",
        P6: "http://i.imgur.com/EyQAQ10.png",
        P7: "http://i.imgur.com/RV32jmm.png",
        P8: "http://i.imgur.com/DoACCNh.png",
        P9: "http://i.imgur.com/PYRguTf.png",
        P10: "http://i.imgur.com/UytFMU1.png",
        P11: "http://i.imgur.com/44zz3dC.png",
        P13: "http://i.imgur.com/KQmIe6z.png",
        P17: "http://i.imgur.com/ouplMc9.png",
        P18: "http://i.imgur.com/8bEFPBE.png",
        P19: "http://img.atelier801.com/8124f166.png",
        P22: "http://i.imgur.com/Lxvjj1M.png",
        P23: "http://i.imgur.com/KQmIe6z.png",
        P24: "http://img.atelier801.com/80a4f166.png",
        P32: "http://i.imgur.com/DoACCNh.png",
        P38: "http://i.imgur.com/pUB90w0.png",
        P41: "http://i.imgur.com/GmbpOc6.png",
        P42: "http://i.imgur.com/RV32jmm.png",
        P43: "http://i.imgur.com/BLabBxr.png",
        P44: "http://i.imgur.com/BLabBxr.png",
        P66: "http://i.imgur.com/GmbpOc6.png"
    };
    var categoryNames = {
        P0: "Normal",
        P1: "Protected",
        P2: "Prime",
        P3: "Bootcamp",
        P4: "Shaman",
        P5: "Art",
        P6: "Mechanism",
        P7: "No Shaman",
        P8: "Dual Shamans",
        P9: "Miscellaneous",
        P10: "Survivor",
        P11: "Vampire Survivor",
        P13: "Bootcamp",
        P17: "Racing",
        P18: "Defilante",
        P19: "Music",
        P22: "Tribe House",
        P23: "Bootcamp Test",
        P24: "Dual Shaman Survivor",
        P32: "Dual Shaman Test",
        P38: "Racing Test",
        P41: "Module",
        P42: "No Shaman Test",
        P43: "High Deleted",
        P44: "Deleted",
        P66: "Themed"
    };
    var displayCategory = {
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
        P22: false,
        P23: false,
        P24: true,
        P32: false,
        P38: false,
        P41: false,
        P42: false,
        P43: false,
        P44: false,
        P66: false
    };
    var showCategoryIcon = true;
    var showCategoryName = false;
    var showMapCount = true;
    var maxCols = 5;

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

    function toBBCode(text) {
        var mapsByCategory = {};
        readLine(text, function (line) {
            var match = regex.exec(line);
            if (match === null) {
                return;
            }
            var code = match[1];
            var category = match[2];
            if (!mapsByCategory[category]) {
                mapsByCategory[category] = [];
            }
            mapsByCategory[category].push(code);
        });
        var bbcode = "[table align=center][row]";
        for (var i = 0, j = 0; i < allCategories.length; i++) {
            var category = allCategories[i];
            if (displayCategory[category]) {
                var maps = mapsByCategory[category];
                if (maps) {
                    if (j === maxCols) {
                        bbcode += "[/row][row]";
                        j = 0;
                    }
                    bbcode += "[cel][spoiler=";
                    if (showCategoryIcon) {
                        bbcode += "[img]" + categoryIcons[category] + "[/img]";
                    }
                    if (showCategoryName) {
                        bbcode += " " + categoryNames[category];
                    }
                    if (showMapCount) {
                        bbcode += " (" + maps.length + ")";
                    }
                    bbcode += "]";
                    for (var k = 0; k < maps.length; k++) {
                        bbcode += "\n" + maps[k];
                    }
                    bbcode += "[/spoiler][/cel]";
                    j++;
                }
            }
        }
        bbcode += "[/row][/table]";
        return bbcode;
    };

    function checkboxChangeEventHandler(event) {
        var target = event.target;
        displayCategory[target.value] = target.checked;
    }

    window.addEventListener("load", function () {
        var inputs = document.getElementsByTagName("input");
        inputs[0].addEventListener("change", function (event) {
            showCategoryIcon = event.target.checked;
        });
        inputs[1].addEventListener("change", function (event) {
            showCategoryName = event.target.checked;
        });
        inputs[2].addEventListener("change", function (event) {
            showMapCount = event.target.checked;
        });
        var container = document.getElementById("categories");
        for (var i = 0; i < allCategories.length; i++) {
            var category = allCategories[i];
            var label = document.createElement("label");
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = category;
            checkbox.checked = displayCategory[category];
            checkbox.addEventListener("change", checkboxChangeEventHandler);
            label.appendChild(checkbox);
            var text = document.createTextNode(category + " - " + categoryNames[category]);
            label.appendChild(text);
            container.appendChild(label);
        }
        var source = document.getElementById("source");
        var output = document.getElementById("output");
        var button = document.getElementById("button");
        button.addEventListener("click", function (event) {
            output.value = toBBCode(source.value);
        });
    });
})();

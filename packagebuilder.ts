const fs = require("fs");

const input_package_json = JSON.parse(fs.readFileSync("package.json"));
const jsonpackagelist = JSON.parse(fs.readFileSync("files.json"));
let new_package_json = input_package_json;

function compare(diff: number[], min: number[]) {
    let j = 0;
    const length_list = diff.length;

    let flag_positive = false,flag_less= false;
    // checking whether the difference between 2 version is greater that 0
    while (j < length_list) {
        if (diff[j] > 0) 
            flag_positive  = true;

        if ((diff[j] > min[j] && !flag_less) || ( diff[j] < 0 && !flag_positive ))
            return false;

        else if(diff[j] < min[j])
            flag_less=true
            
        if(flag_positive && flag_less)
            return true;

        j++;
    }
}

const search_list = ["devDependencies", "dependencies"];
search_list.forEach((key) => {
    for (const pack in input_package_json[key]) {
        const pack_val = input_package_json[key][pack].substring(1,).split('.');
        for (const valid_pack in jsonpackagelist) {
            if (valid_pack === pack) {
                let min = [9999, 9999, 9999];
                let valid = false;
                let valid_version;
                for (const version in jsonpackagelist[valid_pack]) {
                    const valid_pack_val = jsonpackagelist[valid_pack][version].split('.');
                    let i = 0;
                    let diff = []
                    let diff_str = "";
                    const length_list = valid_pack_val.length;
                    while (i < length_list) {
                        diff[i] = parseInt(valid_pack_val[i]) - parseInt(pack_val[i]);
                        i++;
                    }
                    diff_str = diff.join('.');
                    if (diff_str === "0.0.0") {
                        console.log("matched_version for package ", pack)
                        valid = true;
                        break;
                    }
                    else if (compare(diff, min)) {
                        min = diff;
                        valid_version = jsonpackagelist[valid_pack][version];
                    }
                }
                if (!valid) {
                    console.log("changed_package_version");
                    new_package_json[key][pack] = input_package_json[key][pack][0] + valid_version
                }
                break;
            }

        }
    }
});

console.log(new_package_json);

fs.writeFileSync("new_package.json", JSON.stringify(new_package_json));
#!/bin/bash
echo "Enter the name of owner"
read owner
echo "Old_Key","New_Key","Owner","Package/Micro_Service" >> 'env_updation.txt'
echo "New_Key","Value","Package/Micro_Service","Type","Secuirty" >> 'repo_lookup.txt'
jq -c '.[]' env.json | while read i; do
    # do stuff with $i
    original_name=`expr $i | jq -r ".original_name"`
    new_name=`expr $i | jq -r ".new_name" ` 
    value=`expr $i | jq -r ".value" `
    #echo $original_name
    original_string=`expr "env."$original_name`
    new_string="env."$new_name
    #echo $original_string
    #echo $new_string
    # Find & Replace in Multiple Files
    result=$(grep -rl --exclude-dir=node_modules $original_string .)
    display_owner_name="@"$owner
    for file in $result; do
        repo=$(echo "$(dirname -- "$file")" | sed 's/^..//')
        if [ $original_name != $new_name ] 
        then 
            echo $original_name,$new_name,$display_owner_name,$repo >> 'env_updation.txt'
        fi 
        echo $new_name,$value,$repo,"Specific","Non Sensitive" >> 'repo_lookup.txt'
    done
    if [ $original_name != $new_name ] 
    then 
        echo "a is not equal to b"
        #grep -rl --exclude-dir=node_modules $new_string . | xargs sed -i "s/$new_string/$original_string/g"
    fi 
done
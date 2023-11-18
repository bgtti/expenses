//Function takes an array of groups and returns an array of subgroups (or empty array if none are found)
export function getArrayOfSubgroups(groups) {
    let subgroups = []
    groups.forEach(group => {
        let subs = group.subgroups;
        if (subs.length > 0) {
            for (let sub of subs) {
                let theSub = {
                    'uuid': sub.uuid,
                    'name': sub.name,
                    'description': sub.description,
                    'code': sub.code,
                    'groupName': group.name,
                    'groupUuid': group.uuid,
                }
                subgroups.push(theSub);
            }
        }
    })
    return subgroups;
}
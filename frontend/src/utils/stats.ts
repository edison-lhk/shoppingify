export const getSumOfAllItems = (shoppingLists: Array<{ id: string, name: string, items: Array<{ id: string, name: string, category: string, image?: string, note?: string, amount: number }>, status: string, createdAt: Date }>) => {
    let totalAmount = 0;

    shoppingLists.forEach(shoppingList => {
        shoppingList.items.forEach(item => {
            totalAmount += item.amount;
        });
    });

    return totalAmount;
}

export const getSetOfUniqueItems = (shoppingLists: Array<{ id: string, name: string, items: Array<{ id: string, name: string, category: string, image?: string, note?: string, amount: number }>, status: string, createdAt: Date }>) => {
    const uniqueItemsList: string[] = [];

    shoppingLists.forEach(shoppingList => {
        shoppingList.items.forEach(item => {
            uniqueItemsList.push(item.name);
        })
    });

    return Array.from(new Set(uniqueItemsList));
};

export const getSumofEachItem = (shoppingLists: Array<{ id: string, name: string, items: Array<{ id: string, name: string, category: string, image?: string, note?: string, amount: number }>, status: string, createdAt: Date }>, itemName: string) => {
    let amount = 0;

    shoppingLists.forEach(shoppingList => {
        shoppingList.items.forEach(item => {
            if (item.name === itemName) {
                amount += item.amount;
            }
        })
    });

    return amount;
};

export const getListOfTopItems = (shoppingLists: Array<{ id: string, name: string, items: Array<{ id: string, name: string, category: string, image?: string, note?: string, amount: number }>, status: string, createdAt: Date }>) => {
    const topItemsList: { name: string, percentage: number }[] = [];

    const uniqueItemsSet = getSetOfUniqueItems(shoppingLists);

    uniqueItemsSet.forEach(item => {
        const amount = getSumofEachItem(shoppingLists, item);
        const percentage = (amount / getSumOfAllItems(shoppingLists)) * 100;
        topItemsList.push({ name: item, percentage: Number(percentage.toFixed(0)) });
    })

    const sortedTopItemsList = topItemsList.sort((itemA, itemB) => {
        if (itemA.percentage > itemB.percentage) {
            return -1;
        } else if (itemA.percentage < itemB.percentage) {
            return 1;
        } else {
            return 0;
        }
    });

    return sortedTopItemsList.slice(0, 3);
};

export const getSumOfAllCategories = (shoppingLists: Array<{ id: string, name: string, items: Array<{ id: string, name: string, category: string, image?: string, note?: string, amount: number }>, status: string, createdAt: Date }>) => {
    let totalAmount = 0;

    shoppingLists.forEach(shoppingList => {
        shoppingList.items.forEach(() => {
            totalAmount += 1;
        });
    });

    return totalAmount;
};

export const getSetOfUniqueCategories = (shoppingLists: Array<{ id: string, name: string, items: Array<{ id: string, name: string, category: string, image?: string, note?: string, amount: number }>, status: string, createdAt: Date }>) => {
    const uniqueCategoriesList: string[] = [];

    shoppingLists.forEach(shoppingList => {
        shoppingList.items.forEach(item => {
            uniqueCategoriesList.push(item.category);
        })
    });

    return Array.from(new Set(uniqueCategoriesList));
};

export const getSumofEachCategory = (shoppingLists: Array<{ id: string, name: string, items: Array<{ id: string, name: string, category: string, image?: string, note?: string, amount: number }>, status: string, createdAt: Date }>, categoryName: string) => {
    let amount = 0;

    shoppingLists.forEach(shoppingList => {
        shoppingList.items.forEach(item => {
            if (item.category === categoryName) {
                amount += 1;
            }
        })
    });

    return amount;
};

export const getListOfTopCategories = (shoppingLists: Array<{ id: string, name: string, items: Array<{ id: string, name: string, category: string, image?: string, note?: string, amount: number }>, status: string, createdAt: Date }>) => {
    const topCategoriesList: { name: string, percentage: number }[] = [];

    const uniqueCategoriesSet = getSetOfUniqueCategories(shoppingLists);

    uniqueCategoriesSet.forEach(category => {
        const amount = getSumofEachCategory(shoppingLists, category);
        const percentage = (amount / getSumOfAllCategories(shoppingLists)) * 100;
        topCategoriesList.push({ name: category, percentage: Number(percentage.toFixed(0)) });
    })

    const sortedTopCategoriesList = topCategoriesList.sort((categoryA, categoryB) => {
        if (categoryA.percentage > categoryB.percentage) {
            return -1;
        } else if (categoryA.percentage < categoryB.percentage) {
            return 1;
        } else {
            return 0;
        }
    });

    return sortedTopCategoriesList.slice(0, 3);
};

export const getSetOfUniqueMonths = (shoppingLists: Array<{ id: string, name: string, items: Array<{ id: string, name: string, category: string, image?: string, note?: string, amount: number }>, status: string, createdAt: Date }>) => {
    const uniqueMonthsList: string[] = [];

    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    shoppingLists.forEach(shoppingList => {
        uniqueMonthsList.push(monthList[new Date(shoppingList.createdAt).getMonth()]);
    })

    return Array.from(new Set(uniqueMonthsList));
};

export const getSumOfEachMonth = (shoppingLists: Array<{ id: string, name: string, items: Array<{ id: string, name: string, category: string, image?: string, note?: string, amount: number }>, status: string, createdAt: Date }>, month: string) => {
    let amount = 0;

    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    shoppingLists.forEach(shoppingList => {
        if (monthList[new Date(shoppingList.createdAt).getMonth()] === month) {
            shoppingList.items.forEach(item => {
                amount += item.amount;
            })
        }
    });

    return amount;
};

export const getListOfMonthlySummary = (shoppingLists: Array<{ id: string, name: string, items: Array<{ id: string, name: string, category: string, image?: string, note?: string, amount: number }>, status: string, createdAt: Date }>) => {
    const monthlySummaryList: { month: string, items: number }[] = [];

    const uniqueMonthsSet = getSetOfUniqueMonths(shoppingLists);

    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    uniqueMonthsSet.forEach(month => {
        const amount = getSumOfEachMonth(shoppingLists, month);
        monthlySummaryList.push({ month, items: amount });
    });

    const sortedMonthlySummaryList = monthlySummaryList.sort((monthA, monthB) => {
        if (monthList.indexOf(monthA.month) > monthList.indexOf(monthB.month)) {
            return 1;
        } else if (monthList.indexOf(monthA.month) < monthList.indexOf(monthB.month)) {
            return -1;
        } else {
            return 0;
        }
    });

    return sortedMonthlySummaryList;
};


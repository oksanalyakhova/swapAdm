export default {
    data() {
        return {
            batch: [],
        }
    },
    methods: {
        /**
         * @param status
         * @returns {{name: string, className: string}}
         */
        getExchangeStatus(status) {
            let name = 'Exchange';

            switch (status) {
                case 0 :
                    name = 'Remaining';
                    break;
                case 1 :
                    name = 'Pay';
                    break;
                case 6 :
                    name = 'Completed';
                    break;
                case 10 :
                    name = 'Overdue';
                    break;
                case 11 :
                    name = 'Returned';
                    break;
            }

            return {
                name: name,
                className: name.toLowerCase(),
            }
        },
        batchData(data, perPage) {
            this.batch = data.map((e, i) => {
                return i % perPage === 0 ? data.slice(i, i + perPage) : null;
            }).filter(e => e);

            return {
                total: this.batch,
                current: this.batch[0],
            };
        },
    }
}

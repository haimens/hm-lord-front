
/* eslint-disable */
import moment from 'moment'
export function convertIntegerToString(balanceObj, currency = 'CNY', padding = 2) {
    if (balanceObj) {
        const integer = balanceObj[currency].balance
        return parseFloat(integer / 100).toFixed(padding)
    }
    return '0'
}

export function getBalance(balance, padding = 2) {
    return parseFloat(balance / 100).toFixed(padding)
}

export function translateStatusToStr(table, status) {
    if (table === 'PIECE') {
        switch (status) {
            case 3: return '等待付款中'
            case 4: return '已完成'
            case 5: return '异常'
            default: return status
        }
    }
    if (table === 'BLACKMAIL') {
        switch (status) {
            case 1: return '验证中'
            case 2: return '待处理'
            case 3: return '已受理'
            case 4: return '出款成功'
            case 5: return '异常'
            default: return status
        }
    }

}

export function translateENToCN(word) {
    switch (word) {
        case 'cdate':
        case 'create_at':
            return '创建时间'
        case 'WAITING FOR PAYMENT': return '等待付款'
        case 'SUCCESS': return '付款成功'
        case 'FAIL': return '付款失败'
        case 'udate': return '上次更新时间'
        case 'status': return '状态'
        case 'pirate_token': return '分账户密钥'
        case 'transaction_id': return '交易编码ID'
        case 'amount': return '金额'
        case 'type': return '类型'
        case 'currency': return '币种'
        case 'last_update': return '更新时间'
        case 'CNY': return '人民币'
        case 1: return '审核中'
        case 0: return '删除'
        case 2: return '开启'
        case 3: return '关闭'
        case 'total deposit': return '总存款'
        case 'total withdraw': return '总出款'
        case 'trans_token': return '交易ID码'
        case 'identifier':
        case 'pirate_identifier': return '分账户名'
        case 'status_str': return '状态'
        case 'mail_token': return '取款码'
        case 'PENDING': return '等待中'
        case 'CONFIRMED': return '受理中'
        case 'COMPLETED': return '已完成'
        case 'BLOCKED': return '异常'
        case 'IN PROGRESS': return '受理中'
        case 'ACTIVE': return '开启'
        case 'INACTIVE': return '关闭'
        case 'transaction_status': return '状态'
        case 'tear_token': return '下发交易ID'
        case 'qqpay': return 'QQ钱包'
        case 'alipay': return `支付宝`
        case 'wechatpay': return '微信支付'
        case 'payment_method': return '支付方式'
        case 'total_deposit': return '总存款'
        case 'bank_name': return '银行名字'
        case 'holder_name': return '银行账户持有人'
        case 'last_usage': return '上次使用时间'
        case 'pirate_detail':
        case 'black_mail_detail':
        case 'detail':
        case 'check_detail': return '查看详情'
        case 'edit': return '修改'
        case 'search': return '搜索'
        case 'tear_detail': return '查看'
        case 'deposit': return '存款'
        case 'withdraw': return '下发'
        case 'wechatpay': return '微信支付'
        case 'order_num': return '自定义订单号'
        default: return word
    }
}

export function translateCNToEN(word) {
    switch (word) {
        case '审核中': return 1
        case '删除': return 0
        case '开启': return 2
        case '关闭': return 3
        default: return word
    }
}

export function colorCode(key) {
    switch (key) {
        case '开启':
        case '出款成功':
        case '存款成功':
            return 'success'
        case '审核中':
            return 'alert'
        case '删除':
        case '关闭':
            return 'danger'
        default:
            return key
    }
}

export function getPageCount(total_count, perPage = 30) {
    return Math.ceil(total_count / perPage)
}

export function getPageIndex(page) {
    return 30 * ((page || 1) - 1)
}

export function generateRandomDigit() {
    return Math.ceil(1000 + Math.random() * 99998)
}

export function formatDate(date) {
    return moment(date).format('YYYY-MM-DD HH:mm')
}

export function formatData(_data = []) {
    const deepCopyData = JSON.parse(JSON.stringify(_data))
    return deepCopyData.map(item => {
        if (item && item.amount) item.amount = getBalance(item.amount)
        if (item.last_update) item.last_update = formatDate(item.last_update)
        if (item.cdate) item.cdate = formatDate(item.cdate)
        if (item.udate) item.udate = formatDate(item.udate)
        return item
    })
}

export function calculatePercentage(current, past) {
    if (current === 0) return ''
    const isIncreased = Number(current) - Number(past)
    const percentage = isIncreased >= 0
        ? ((current - past) / past * 100).toFixed(1)
        : ((past - current) / past * 100).toFixed(1)
    return { isIncreased, percentage }
}

export function dealFinalError(err, dispatch, logout) {
    const message = err.message || err
    if (message === 'USER_AUTHENTICATE_FAIL') {
        dispatch(logout(message))
    }
    else throw err
}

export function applyCurrencySign(sign) {
    return process.env.REACT_APP_CURRENCY_TOKEN === '91ed6e70b744744b83b19337b9bc55b3'
        ? sign || '¥'
        : sign || '$'
}

export function applyStyle(which) {
    return styles[which]
}

export function getLastHourInUTC(date) {
    const localTime = moment(date).set({ h: 23, m: 59, s: 59 })
    return moment(localTime.toISOString(true)).utc().toISOString()
}

export function getLastDaysInMonthUTC(date) {
    const localTime = moment(date).endOf('month')
    const daysInMonth = localTime.daysInMonth()
    return {
        date: moment(localTime.toISOString(true)).utc().toISOString(),
        daysInMonth
    }
}

//===== inline style section ===========================

const styles = {
    link: {
        color: 'blue',
        ':hover': {
            color: 'purple'
        },
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    label: {
        lineHeight: '25px'
    },
    danger: {
        color: '#d0021b'
    },
    green: {
        color: '#33ad00'
    },
    yellow: {
        color: '#f5a623'
    },
    orange: {
        color: 'orange'
    },
    blue: {
        color: '#4a90e2'
    },
    bold: {
        fontWeight: 'bold'
    },
    green: {
        color: '#33ad00'
    },
    red: {
        color: '#d0021b'
    }

}

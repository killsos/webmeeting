<template>
    <div class="item">
        <div class="body">
            <div class="name">{{ source.userName }}</div>
            <div class="content">
                <div class="text">{{ source.content }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { defineEmits, defineProps, ref } from 'vue'
    defineProps({
        source: {
            type: Object,
            default: () => ({
                sid: '',
                userName: {},
                content: '',
                time: new Date().getTime(),
            }),
        },
    })
</script>
<style lang="scss" scoped>
    .item {
        display: flex;
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 192, 203, 0.2);
            img {
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .body {
            flex: 1;
            padding-left: 1em;
            font-size: 16px;
            max-width: 560px;
            word-break: break-word;
            .name {
                padding-bottom: 0.2em;
                font-size: 12px;
            }
            .content {
                position: relative;
                color: #000;
                background-color: aliceblue;
                border-radius: 15px;
                padding: 0.5em 1em;
            }
        }
        &.creator {
            transform: rotateX(180deg);
            direction: rtl;
            align-items: flex-end;
            .avatar {
                transform: rotateX(180deg);
            }
            .body {
                transform: rotate(180deg);
            }
            .text {
                transform: rotateY(180deg);
                direction: ltr;
            }
        }
    }
</style>

const db = require('../../database/models')
const { QueryTypes } = require('sequelize')

exports.findCardData = (req, res) => {
    const { idol_id } = req.query
    console.log(req.query)
    const raw = `select
            tic.card_name ,
            tic.card_hash ,
            tic.card_atk ,
            tic.card_def ,
            tic.card_rare ,
            tic.card_seq ,
            tic.idol_id ,
            tca.ability_name ,
            (
            select
                cd_v_meaning_trans
            from
                "TB_MASTER_CODE" tmc
            where
                category = 'EffectScope'
                and cd_v::numeric = tca.ability_scope) ability_scope,
            (
            select
                cd_v_meaning_trans
            from
                "TB_MASTER_CODE" tmc
            where
                category = 'EffectStrength'
                and cd_v::numeric = tca.ability_strength) ability_effect,
            (
            select
                cd_v_meaning_trans
            from
                "TB_MASTER_CODE" tmc
            where
                category = 'EffectType'
                and cd_v::numeric = tca.ability_type) ability_type,
            (
            select
                cd_v_meaning_trans
            from
                "TB_MASTER_CODE" tmc
            where
                category = 'EffectBackMemberScope'
                and cd_v::numeric = tca.ability_backmember) ability_backmember,
            (
            select
                cd_v_meaning_trans
            from
                "TB_MASTER_CODE" tmc
            where
                category = 'EffectScope'
                and cd_v::numeric = tca.db_scope) db_scope,
            (
            select
                cd_v_meaning_trans
            from
                "TB_MASTER_CODE" tmc
            where
                category = 'EffectStrength'
                and cd_v::numeric = tca.db_strength) db_strength,
            (
            select
                cd_v_meaning_trans
            from
                "TB_MASTER_CODE" tmc
            where
                category = 'EffectType'
                and cd_v::numeric = tca.db_type) db_type,
            (
            select
                cd_v_meaning_trans
            from
                "TB_MASTER_CODE" tmc
            where
                category = 'EffectBackMemberScope'
                and cd_v::numeric = tca.db_backmember) db_backmember
        from
            "TB_IDOLS_CARDS" tic
        left join "TB_CARDS_ABILITY" tca on
            (tic.card_hash = tca.card_hash)
        where
            tic.idol_id = :idol_id
        order by
            tic.idol_id ,
            tic.card_seq`;

    db.sequelize.query(raw, {
        replacements: { idol_id },
        type: QueryTypes.SELECT
    }).then(rst => {
        res.json(rst)
    }).catch(er => {
        console.log(er)
        res.json('err')
    })

}

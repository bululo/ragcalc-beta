import {equipStats, multipliers, s_refinement, skill, target} from "../scripts/core/state.js";
import {property, race, size, type} from "../scripts/core/constants.js";

export const s_armor = [
    {
        id: '24273', dbname: 'S_Priest_Armor', name: 'Malha Sombria de Sacerdote',
        tags: 'ARCHBISHOP',
        script: function () {
            // Dano de [Magnus Exorcismus] +20%.
            // A cada refino: Dano de [Magnus Exorcismus] +5%.
            if (skill.id === "PR_MAGNUS")
                multipliers.skill += 20 + (s_refinement.armor * 5);
            // Conjunto
            // Greva Sombria de Sacerdote
            // Dano mágico +3%.
            if (document.getElementById('s_sho').value === '24260')
                multipliers.matk += 3;
        }
    },
    {
        id: '24245', dbname: 'S_Reload_Armor', name: 'Malha Sombria da Pós-conjuração',
        script: function () {
            equipStats.castdelay += 1;
            if (s_refinement.armor >= 7)
                equipStats.castdelay += 1;
            if (s_refinement.armor >= 9)
                equipStats.castdelay += 1;
            // Conjunto
            // Greva Sombria da Pós-conjuração
            // Escudo Sombrio da Pós-conjuração
            if (document.getElementById('s_shi').value === '24244' && document.getElementById('s_sho').value === '24243') {
                equipStats.castdelay += 1;
                if ((s_refinement.armor + s_refinement.shield + s_refinement.shoes) >= 25)
                    equipStats.castdelay += 5;
            }
        }
    },
    {
        id: '24667', dbname: 'S_FullTemp_Armor', name: 'Malha Sombria Tempestiva',
        script: function () {
            // Ignora 5% da DEFM de todas as raças de monstros.
            equipStats.bypass += 5;
            // A cada 2 refinos: Ignora +1% da DEFM de todas as raças de monstros.
            equipStats.bypass += Math.floor(s_refinement.armor / 2);
            // Refino +10 ou mais: Dano mágico contra todas as raças de monstros +3%.
            if (s_refinement.armor === 10)
                multipliers.race[race.ALL] += 3;
            // Conjunto [Greva Sombria Tempestiva]
            // Dano mágico +2%.
            // Soma dos refinos do conjunto 18 ou mais: Ignora 100% da DEFM de todas as raças de monstros.
            if (document.getElementById('s_sho').value === '24666') {
                multipliers.matk += 2;
                if ((s_refinement.armor + s_refinement.shoes) >= 18)
                    equipStats.bypass += 100;
            }
        }
    },
    {
        id: '24728', dbname: 'S_M_AutoSpell_Armor', name: 'Malha Sombria de Automagia',
        script: function () {
            multipliers.matk += 3;
            multipliers.skill_property[property.ALL] += Math.floor(s_refinement.armor / 2);
            if (s_refinement.armor >= 9)
                equipStats.flatASPD += 1;
            // Conjunto
            // Greva Sombria de Automagia
            if (document.getElementById('s_sho').value === '24729') {
                multipliers.matk += 2;
            }
        }
    },
    {
        id: '24675', dbname: 'S_TrueGem_Armor', name: 'Malha Sombria de Pedras Preciosas',
        script: function () {
            multipliers.matk += 3;
            multipliers.skill_property[property.ALL] += Math.floor(s_refinement.armor / 2);
            if (s_refinement.armor >= 10)
                equipStats.VCT += 3;
            if (document.getElementById('s_sho').value === '24676') {
                multipliers.matk += 2;
                if ((s_refinement.armor + s_refinement.shoes) >= 20) {
                    multipliers.size[size.ALL] += 12
                }
            }
        }
    },
];

export const s_weapon = [
    {
        id: '24292', dbname: 'S_Archbishop_Weapon', name: 'Luva Sombria de Arcebispo',
        tags: 'ARCHBISHOP',
        script: function () {
            equipStats.flatMATK += s_refinement.weapon;
            // Conjunto Escudo Sombrio de Arcebispo: Recarga de [Adoramus] -1 segundo.
            if (document.getElementById('s_shi').value === '24305' && skill.id === 'AB_ADORAMUS')
                skill.cooldown = ( (skill.cooldown*10) - 10 )/10;
        }
    },
    {
        id: '24297', dbname: 'S_Sorcerer_Weapon', name: 'Luva Sombria de Feiticeiro',
        tags: 'SORCERER',
        script: function () {
            equipStats.flatMATK += s_refinement.weapon;
            // Recarga de [Pó de Diamante] -1 segundo.
            // A cada refino: Recarga de [Pó de Diamante] -0,3 segundos.
            if (skill.id === 'SO_DIAMONDDUST')
                skill.cooldown = ( (skill.cooldown*10) - ( 10 + (s_refinement.weapon*0.3) ) )/10;
            // Conjunto Escudo Sombrio de Feiticeiro
            // Dano de [Pó de Diamante] e [Castigo de Nerthus] +20%..
            if (document.getElementById('s_shi').value === '24310')
                if (skill.id === 'SO_DIAMONDDUST' || skill.id === 'SO_EARTHGRAVE')
                    multipliers.skill += 20;
        }
    },
    {
        id: '24736', dbname: 'S_Clever_Weapon', name: 'Luva Sombria Pontual',
        script: function () {
            equipStats.flatMATK += s_refinement.weapon;
            multipliers.skill_property[property.ALL] += 2;
            multipliers.matk += Math.floor(s_refinement.weapon / 2)
            if (s_refinement.weapon >= 9)
                equipStats.VCT += 5;
            if (s_refinement.weapon === 10)
                multipliers.skill_property[property.ALL] += 7;
        }
    },
    {
        id: '24439', dbname: 'S_Hasty_Weapon', name: 'Luva Sombria Fugaz',
        script: function () {
            equipStats.flatMATK += s_refinement.weapon;
            multipliers.matk += 1 + Math.floor(s_refinement.weapon / 2);
        }
    },
    {
        id: '24386', dbname: 'S_Infinity_Weapon', name: 'Luva Sombria do Infinito',
        script: function () {
            equipStats.flatMATK += s_refinement.weapon;
            multipliers.size[size.ALL] += Math.floor(s_refinement.weapon / 3);
        }
    },
    {
        id: '24497', dbname: 'S_Magnus_Weapon', name: 'Luva Sombria Magnus',
        tags: 'ARCHBISHOP',
        script: function () {
            // ATQ e ATQM +1 por refino.
            equipStats.flatMATK += s_refinement.weapon;
            // Dano mágico de propriedade Sagrado +3%.
            multipliers.skill_property[property.HOLY] += 3;
            // Refino +7 ou mais: Dano mágico de propriedade Sagrado +3% adicional.
            if (s_refinement.weapon >= 7)
                multipliers.skill_property[property.HOLY] += 3;
            // Refino +9 ou mais: Dano mágico de propriedade Sagrado +4% adicional.
            if (s_refinement.weapon >= 9)
                multipliers.skill_property[property.HOLY] += 4;
            // Conjunto Escudo Sombrio de Arcebispo
            if (document.getElementById('s_shi').value === '24305') {
                // Ignora 40% da DEFM de todas as raças de monstros.
                // A cada refino da Luva e do Escudo: Ignora +1% da DEFM de todas as raças de monstros.
                equipStats.bypass += 40 + s_refinement.weapon + s_refinement.shield;
            }
        }
    }
];

export const s_shield = [
    {
        id: '24305', dbname: 'S_Archbishop_Shield', name: 'Escudo Sombrio de Arcebispo',
        tags: 'ARCHBISHOP',
        script: function () {
            // Dano de [Adoramus] +20%.
            if (skill.id === 'AB_ADORAMUS')
                multipliers.skill += 20;
            // A cada refino: Dano de [Adoramus] +5%.
            if (skill.id === 'AB_ADORAMUS')
                multipliers.skill += s_refinement.shield * 5;
            // Conjunto
            // Greva Sombria de Sacerdote
            // Malha Sombria de Sacerdote
            // Luva Sombria de Arcebispo
            // Brinco Sombrio de Noviço
            // Colar Sombrio de Noviço
            // Todos os atributos +10.
            // HP e SP máx. +5%.
            // Ignora 50% da DEF e DEFM de monstros normais.
            if (document.getElementById('s_arm').value === '24273' &&
                document.getElementById('s_sho').value === '24260' &&
                document.getElementById('s_ear').value === '24248' &&
                document.getElementById('s_nec').value === '24252' &&
                document.getElementById('s_wea').value === '24292') {
                equipStats.str += 10;
                equipStats.agi += 10;
                equipStats.vit += 10;
                equipStats.int += 10;
                equipStats.dex += 10;
                equipStats.luk += 10;
                if (target.type === type.NORMAL)
                    equipStats.bypass += 50;
            }
        }
    },
    {
        id: '24310', dbname: 'S_Sorcerer_Shield', name: 'Escudo Sombrio de Feiticeiro',
        tags: 'SORCERER',
        script: function () {
            // Recarga de [Castigo de Nerthus] -1 segundo.
            // A cada refino: Recarga de [Castigo de Nerthus] -0,3 segundos.
            if (skill.id === 'SO_EARTHGRAVE')
                skill.cooldown = ( (skill.cooldown*10) - ( 10 + (s_refinement.weapon*0.3) ) )/10;
            // Conjunto
            // Greva Sombria de Sábio
            // Malha Sombria de Sábio
            // Luva Sombria de Feiticeiro
            // Brinco Sombrio de Mago
            // Colar Sombrio de Mago
            if (document.getElementById('s_arm').value === '24278' &&
                document.getElementById('s_sho').value === '24265' &&
                document.getElementById('s_ear').value === '24249' &&
                document.getElementById('s_nec').value === '24254' &&
                document.getElementById('s_wea').value === '24297') {
                // Todos os atributos +10.
                equipStats.str += 10;
                equipStats.agi += 10;
                equipStats.vit += 10;
                equipStats.int += 10;
                equipStats.dex += 10;
                equipStats.luk += 10;
                // HP e SP máx. +5%.
                // Ignora 50% da DEF e DEFM de monstros normais.
                if (target.type === type.NORMAL)
                    equipStats.bypass += 50;
            }
        }
    },
    {
        id: '24746', dbname: 'S_S_Reload_Shield', name: 'Escudo Sombrio da Recarga',
        script: function () {
            equipStats.castdelay += s_refinement.shield;
            equipStats.percentASPD += Math.floor(s_refinement.shield / 2) * 3;
            if (s_refinement.shield >= 9)
                multipliers.matk += 3;
        }
    },
    {
        id: '24244', dbname: 'S_Reload_Shield', name: 'Escudo Sombrio da Pós-conjuração',
        script: function () {
            equipStats.castdelay += 1;
            if (s_refinement.shield >= 7)
                equipStats.castdelay += 1;
            if (s_refinement.shield >= 9)
                equipStats.castdelay += 1;
        }
    },
    {
        id: '24737', dbname: 'S_Clever_Shield', name: 'Escudo Sombrio Pontual',
        script: function () {
            multipliers.skill_property[property.ALL] += 2;
            multipliers.matk += Math.floor(s_refinement.shield / 2)
            if (s_refinement.shield >= 9)
                equipStats.VCT += 5;
            if (s_refinement.shield === 10)
                multipliers.skill_property[property.ALL] += 7;
        }
    },
];

export const s_shoes = [
    {
        id: '24260', dbname: 'S_Priest_Shoes', name: 'Greva Sombria de Sacerdote',
        tags: 'ARCHBISHOP',
        script: function () {
        }
    },
    {
        id: '24243', dbname: 'S_Reload_Shoes', name: 'Greva Sombria da Pós-conjuração',
        script: function () {
            equipStats.castdelay += 1;
            if (s_refinement.shoes >= 7)
                equipStats.castdelay += 1;
            if (s_refinement.shoes >= 9)
                equipStats.castdelay += 1;
        }
    },
    {
        id: '24666', dbname: 'S_FullTemp_Shoes', name: 'Greva Sombria Tempestiva',
        script: function () {
            // Ignora 5% da DEFM de todas as raças de monstros.
            equipStats.bypass += 5;
            // A cada 2 refinos: Ignora +1% da DEFM de todas as raças de monstros.
            equipStats.bypass += Math.floor(s_refinement.shoes / 2);
            // Refino +10 ou mais: Dano mágico contra todas as raças de monstros +3%.
            if (s_refinement.shoes === 10)
                multipliers.race[race.ALL] += 3;
        }
    },
    {
        id: '24729', dbname: 'S_M_AutoSpell_Shoes', name: 'Greva Sombria de Automagia',
        script: function () {
            multipliers.matk += 3;
            multipliers.skill_property[property.ALL] += Math.floor(s_refinement.shoes / 2);
            if (s_refinement.shoes >= 9)
                equipStats.percentASPD += 3;
        }
    },
    {
        id: '24676', dbname: 'S_TrueGem_Shoes', name: 'Greva Sombria de Pedras Preciosas',
        script: function () {
            multipliers.matk += 3;
            multipliers.skill_property[property.ALL] += Math.floor(s_refinement.shoes/2);
            if (s_refinement.shoes >= 10)
                equipStats.VCT += 3;
        }
    },
];

export const s_earring = [
    {
        id: '24339', dbname: 'S_AllMighty_Earring', name: 'Brinco Sombrio Total',
        script: function () {
            equipStats.str += s_refinement.earring;
            equipStats.agi += s_refinement.earring;
            equipStats.vit += s_refinement.earring;
            equipStats.int += s_refinement.earring;
            equipStats.dex += s_refinement.earring;
            equipStats.luk += s_refinement.earring;
        }
    },
    {
        id: '24665', dbname: 'S_FullTemp_Earring', name: 'Brinco Sombrio Tempestivo',
        script: function () {
            // Ignora 5% da DEFM de todas as raças de monstros.
            equipStats.bypass += 5;
            // A cada 2 refinos: Ignora +1% da DEFM de todas as raças de monstros.
            equipStats.bypass += Math.floor(s_refinement.earring / 2);
            // Refino +10 ou mais: Dano mágico contra todas as raças de monstros +3%.
            if (s_refinement.earring === 10)
                multipliers.race[race.ALL] += 3;
        }
    },
    {
        id: '24248', dbname: 'S_Acolyte_earring', name: 'Brinco Sombrio de Noviço',
        tags: 'ARCHBISHOP',
        script: function () {
            if (document.getElementById('s_nec').value === '24252') {
                multipliers.matk += 1;
                if ((s_refinement.earring + s_refinement.necklace) >= 10)
                    multipliers.matk += 3;
            }
        }
    },
    {
        id: '24677', dbname: 'S_TrueGem_Earring', name: 'Brinco Sombrio de Pedras Preciosas',
        script: function () {
            multipliers.matk += 3;
            multipliers.skill_property[property.ALL] += Math.floor(s_refinement.earring/2);
            if (s_refinement.earring >= 10)
                equipStats.VCT += 3;
            if (document.getElementById('s_nec').value === '24678'){
                multipliers.matk += 2;
                if ((s_refinement.earring+s_refinement.necklace)>=20){
                    multipliers.size[size.ALL]+=12
                }
            }
        }
    },
    {
        id: '24499', dbname: 'S_Magnus_Earing', name: 'Brinco Sombrio Magnus',
        tags: 'ARCHBISHOP',
        script: function () {
            // KEKW
        }
    }
];

export const s_necklace = [
    {
        id: '24340', dbname: 'S_AllMighty_Pendant', name: 'Colar Sombrio Total',
        script: function () {
            equipStats.str += s_refinement.necklace;
            equipStats.agi += s_refinement.necklace;
            equipStats.vit += s_refinement.necklace;
            equipStats.int += s_refinement.necklace;
            equipStats.dex += s_refinement.necklace;
            equipStats.luk += s_refinement.necklace;
        }
    },
    {
        id: '24668', dbname: 'S_FullTemp_Pendant', name: 'Colar Sombrio Tempestivo',
        script: function () {
            // Ignora 5% da DEFM de todas as raças de monstros.
            equipStats.bypass += 5;
            // A cada 2 refinos: Ignora +1% da DEFM de todas as raças de monstros.
            equipStats.bypass += Math.floor(s_refinement.necklace / 2);
            // Refino +10 ou mais: Dano mágico contra todas as raças de monstros +3%.
            if (s_refinement.necklace === 10)
                multipliers.race[race.ALL] += 3;
            // Conjunto [Brinco Sombrio Tempestivo]
            // Dano mágico +2%.
            // Soma dos refinos do conjunto 18 ou mais: Ignora 100% da DEFM de todas as raças de monstros.
            if (document.getElementById('s_ear').value === '24665') {
                multipliers.matk += 2;
                if ((s_refinement.necklace + s_refinement.earring) >= 18)
                    equipStats.bypass += 100;
            }
        }
    },
    {
        id: '24252', dbname: 'S_Acolyte_Pendant', name: 'Colar Sombrio de Noviço',
        tags: 'ARCHBISHOP',
        script: function () {
            if (skill.id === "AL_HOLYLIGHT"){
                multipliers.skill += 50 + (s_refinement.necklace * 10);
            }
        }
    },
    {
        id: '24678', dbname: 'S_TrueGem_Pendant', name: 'Colar Sombrio de Pedras Preciosas',
        script: function () {
            multipliers.matk += 3;
            multipliers.skill_property[property.ALL] += Math.floor(s_refinement.necklace/2);
            if (s_refinement.necklace >= 10)
                equipStats.VCT += 3;
        }
    },
    {
        id: '24498', dbname: 'S_Magnus_Pendant', name: 'Colar Sombrio Magnus',
        tags: 'ARCHBISHOP',
        script: function () {
            // Dano de [Magnus Exorcismus] +5%.
            // A cada 2 refinos: Dano de [Magnus Exorcismus] +2%.
            if (skill.id === "PR_MAGNUS")
                multipliers.skill += 5 + ( Math.floor(s_refinement.necklace/2) * 2 );
            // Conjunto
            // Luva Sombria Magnus
            // Brinco Sombrio Magnus
            // A cada refino de cada peça: Dano de [Magnus Exorcismus] +1%.
            if (document.getElementById('s_wea').value === '24497' &&
                document.getElementById('s_ear').value === '24499' &&
                skill.id === "PR_MAGNUS")
                multipliers.skill += s_refinement.weapon + s_refinement.earring + s_refinement.necklace;
        }
    }
];

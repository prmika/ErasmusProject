:-dynamic cost_min/2.
:-dynamic min_time/3.
:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
%HTTP librarys
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
%JSON librarys
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).


:- http_handler('/byweight_json', byWeight, []).
:- http_handler('/bytimes', byTimes, []).
%:- http_handler('/register_user', register_user, []).
%:- http_handler('/send_file_post', send_file_post, []).

%run: http_server(http_dispatch, [port(5000)]).
server(Port) :-
        http_server(http_dispatch, [port(Port)]).

%(Truck name, Starting warehouse, Destination warehouse, Time(minutes), Energy(kWh), Additional time(minutes))

truckData(eTruck01,1,2,122,42,0).
truckData(eTruck01,1,3,122,46,0).
truckData(eTruck01,1,4,151,54,25).
truckData(eTruck01,1,5,147,52,25).
truckData(eTruck01,1,6,74,24,0).
truckData(eTruck01,1,7,116,35,0).
truckData(eTruck01,1,8,141,46,0).
truckData(eTruck01,1,9,185,74,53).
truckData(eTruck01,1,10,97,30,0).
truckData(eTruck01,1,11,164,64,40).
truckData(eTruck01,1,12,76,23,0).
truckData(eTruck01,1,13,174,66,45).
truckData(eTruck01,1,14,59,18,0).
truckData(eTruck01,1,15,132,51,24).
truckData(eTruck01,1,16,181,68,45).
truckData(eTruck01,1,17,128,45,0).

truckData(eTruck01,2,1,116,42,0).
truckData(eTruck01,2,3,55,22,0).
truckData(eTruck01,2,4,74,25,0).
truckData(eTruck01,2,5,65,22,0).
truckData(eTruck01,2,6,69,27,0).
truckData(eTruck01,2,7,74,38,0).
truckData(eTruck01,2,8,61,18,0).
truckData(eTruck01,2,9,103,44,0).
truckData(eTruck01,2,10,36,14,0).
truckData(eTruck01,2,11,88,41,0).
truckData(eTruck01,2,12,61,19,0).
truckData(eTruck01,2,13,95,42,0).
truckData(eTruck01,2,14,78,34,0).
truckData(eTruck01,2,15,69,30,0).
truckData(eTruck01,2,16,99,38,0).
truckData(eTruck01,2,17,46,14,0).

truckData(eTruck01,3,1,120,45,0).
truckData(eTruck01,3,2,50,22,0).
truckData(eTruck01,3,4,46,15,0).
truckData(eTruck01,3,5,46,14,0).
truckData(eTruck01,3,6,74,37,0).
truckData(eTruck01,3,7,63,23,0).
truckData(eTruck01,3,8,38,8,0).
truckData(eTruck01,3,9,84,36,0).
truckData(eTruck01,3,10,59,28,0).
truckData(eTruck01,3,11,61,27,0).
truckData(eTruck01,3,12,67,32,0).
truckData(eTruck01,3,13,67,29,0).
truckData(eTruck01,3,14,82,38,0).
truckData(eTruck01,3,15,34,8,0).
truckData(eTruck01,3,16,80,30,0).
truckData(eTruck01,3,17,36,10,0).

truckData(eTruck01,4,1,149,54,25).
truckData(eTruck01,4,2,65,24,0).
truckData(eTruck01,4,3,46,16,0).
truckData(eTruck01,4,5,27,10,0).
truckData(eTruck01,4,6,103,47,0).
truckData(eTruck01,4,7,55,27,0).
truckData(eTruck01,4,8,36,10,0).
truckData(eTruck01,4,9,50,26,0).
truckData(eTruck01,4,10,78,34,0).
truckData(eTruck01,4,11,42,19,0).
truckData(eTruck01,4,12,97,42,0).
truckData(eTruck01,4,13,44,11,0).
truckData(eTruck01,4,14,111,48,0).
truckData(eTruck01,4,15,32,13,0).
truckData(eTruck01,4,16,53,14,0).
truckData(eTruck01,4,17,38,11,0).

truckData(eTruck01,5,1,141,51,24).
truckData(eTruck01,5,2,55,20,0).
truckData(eTruck01,5,3,48,14,0).
truckData(eTruck01,5,4,25,9,0).
truckData(eTruck01,5,6,97,44,0).
truckData(eTruck01,5,7,55,28,0).
truckData(eTruck01,5,8,29,7,0).
truckData(eTruck01,5,9,48,24,0).
truckData(eTruck01,5,10,69,30,0).
truckData(eTruck01,5,11,53,26,0).
truckData(eTruck01,5,12,95,36,0).
truckData(eTruck01,5,13,63,20,0).
truckData(eTruck01,5,14,105,45,0).
truckData(eTruck01,5,15,34,14,0).
truckData(eTruck01,5,16,46,18,0).
truckData(eTruck01,5,17,27,7,0).

truckData(eTruck01,6,1,69,23,0).
truckData(eTruck01,6,2,71,27,0).
truckData(eTruck01,6,3,74,38,0).
truckData(eTruck01,6,4,103,46,0).
truckData(eTruck01,6,5,99,44,0).
truckData(eTruck01,6,7,88,48,0).
truckData(eTruck01,6,8,92,38,0).
truckData(eTruck01,6,9,134,66,45).
truckData(eTruck01,6,10,42,14,0).
truckData(eTruck01,6,11,116,56,30).
truckData(eTruck01,6,12,23,9,0).
truckData(eTruck01,6,13,126,58,33).
truckData(eTruck01,6,14,25,9,0).
truckData(eTruck01,6,15,84,44,0).
truckData(eTruck01,6,16,132,60,35).
truckData(eTruck01,6,17,80,38,0).

truckData(eTruck01,7,1,116,36,0).
truckData(eTruck01,7,2,71,38,0).
truckData(eTruck01,7,3,61,22,0).
truckData(eTruck01,7,4,53,26,0).
truckData(eTruck01,7,5,53,28,0).
truckData(eTruck01,7,6,88,48,0).
truckData(eTruck01,7,8,59,26,0).
truckData(eTruck01,7,9,88,48,0).
truckData(eTruck01,7,10,84,44,0).
truckData(eTruck01,7,11,74,22,0).
truckData(eTruck01,7,12,82,42,0).
truckData(eTruck01,7,13,76,31,0).
truckData(eTruck01,7,14,97,49,21).
truckData(eTruck01,7,15,29,16,0).
truckData(eTruck01,7,16,84,42,0).
truckData(eTruck01,7,17,69,30,0).

truckData(eTruck01,8,1,134,46,0).
truckData(eTruck01,8,2,59,18,0).
truckData(eTruck01,8,3,32,6,0).
truckData(eTruck01,8,4,34,10,0).
truckData(eTruck01,8,5,32,7,0).
truckData(eTruck01,8,6,88,38,0).
truckData(eTruck01,8,7,57,26,0).
truckData(eTruck01,8,9,69,30,0).
truckData(eTruck01,8,10,65,26,0).
truckData(eTruck01,8,11,53,22,0).
truckData(eTruck01,8,12,82,34,0).
truckData(eTruck01,8,13,61,24,0).
truckData(eTruck01,8,14,97,40,0).
truckData(eTruck01,8,15,36,12,0).
truckData(eTruck01,8,16,65,23,0).
truckData(eTruck01,8,17,32,6,0).

truckData(eTruck01,9,1,181,72,50).
truckData(eTruck01,9,2,95,41,0).
truckData(eTruck01,9,3,86,35,0).
truckData(eTruck01,9,4,55,24,0).
truckData(eTruck01,9,5,48,23,0).
truckData(eTruck01,9,6,134,65,42).
truckData(eTruck01,9,7,95,47,0).
truckData(eTruck01,9,8,69,28,0).
truckData(eTruck01,9,10,109,51,24).
truckData(eTruck01,9,11,61,29,0).
truckData(eTruck01,9,12,132,57,31).
truckData(eTruck01,9,13,67,19,0).
truckData(eTruck01,9,14,143,66,45).
truckData(eTruck01,9,15,71,34,0).
truckData(eTruck01,9,16,15,3,0).
truckData(eTruck01,9,17,67,28,0).

truckData(eTruck01,10,1,97,30,0).
truckData(eTruck01,10,2,34,14,0).
truckData(eTruck01,10,3,59,27,0).
truckData(eTruck01,10,4,78,33,0).
truckData(eTruck01,10,5,71,30,0).
truckData(eTruck01,10,6,40,14,0).
truckData(eTruck01,10,7,82,42,0).
truckData(eTruck01,10,8,65,24,0).
truckData(eTruck01,10,9,109,52,25).
truckData(eTruck01,10,11,92,46,0).
truckData(eTruck01,10,12,32,6,0).
truckData(eTruck01,10,13,99,46,0).
truckData(eTruck01,10,14,63,17,0).
truckData(eTruck01,10,15,74,34,0).
truckData(eTruck01,10,16,105,46,0).
truckData(eTruck01,10,17,53,23,0).




truckData(eTruck01,11,1,164,65,42).
truckData(eTruck01,11,2,88,41,0).
truckData(eTruck01,11,3,65,28,0).
truckData(eTruck01,11,4,42,18,0).
truckData(eTruck01,11,5,55,25,0).
truckData(eTruck01,11,6,118,57,31).
truckData(eTruck01,11,7,74,23,0).
truckData(eTruck01,11,8,59,23,0).
truckData(eTruck01,11,9,63,28,0).
truckData(eTruck01,11,10,97,46,0).
truckData(eTruck01,11,12,111,52,25).
truckData(eTruck01,11,13,25,7,0).
truckData(eTruck01,11,14,126,58,33).
truckData(eTruck01,11,15,53,25,0).
truckData(eTruck01,11,16,59,27,0).
truckData(eTruck01,11,17,67,27,0).

truckData(eTruck01,12,1,76,23,0).
truckData(eTruck01,12,2,61,19,0).
truckData(eTruck01,12,3,67,32,0).
truckData(eTruck01,12,4,97,41,0).
truckData(eTruck01,12,5,92,38,0).
truckData(eTruck01,12,6,19,8,0).
truckData(eTruck01,12,7,82,42,0).
truckData(eTruck01,12,8,86,33,0).
truckData(eTruck01,12,9,128,61,37).
truckData(eTruck01,12,10,32,6,0).
truckData(eTruck01,12,11,109,50,23).
truckData(eTruck01,12,13,120,53,26).
truckData(eTruck01,12,14,40,10,0).
truckData(eTruck01,12,15,78,38,0).
truckData(eTruck01,12,16,126,54,28).
truckData(eTruck01,12,17,74,32,0).

truckData(eTruck01,13,1,174,65,42).
truckData(eTruck01,13,2,107,35,0).
truckData(eTruck01,13,3,74,29,0).
truckData(eTruck01,13,4,46,11,0).
truckData(eTruck01,13,5,67,20,0).
truckData(eTruck01,13,6,128,57,31).
truckData(eTruck01,13,7,80,30,0).
truckData(eTruck01,13,8,76,20,0).
truckData(eTruck01,13,9,67,20,0).
truckData(eTruck01,13,10,105,47,0).
truckData(eTruck01,13,11,27,7,0).
truckData(eTruck01,13,12,122,52,25).
truckData(eTruck01,13,14,137,58,33).
truckData(eTruck01,13,15,67,17,0).
truckData(eTruck01,13,16,59,15,0).
truckData(eTruck01,13,17,78,22,0).

truckData(eTruck01,14,1,59,18,0).
truckData(eTruck01,14,2,80,35,0).
truckData(eTruck01,14,3,80,38,0).
truckData(eTruck01,14,4,109,46,0).
truckData(eTruck01,14,5,105,45,0).
truckData(eTruck01,14,6,27,9,0).
truckData(eTruck01,14,7,97,48,0).
truckData(eTruck01,14,8,99,38,0).
truckData(eTruck01,14,9,143,66,45).
truckData(eTruck01,14,10,61,17,0).
truckData(eTruck01,14,11,122,57,31).
truckData(eTruck01,14,12,42,10,0).
truckData(eTruck01,14,13,132,58,35).
truckData(eTruck01,14,15,90,44,0).
truckData(eTruck01,14,16,139,61,37).
truckData(eTruck01,14,17,86,38,0).

truckData(eTruck01,15,1,132,51,24).
truckData(eTruck01,15,2,74,30,0).
truckData(eTruck01,15,3,34,8,0).
truckData(eTruck01,15,4,36,12,0).
truckData(eTruck01,15,5,36,14,0).
truckData(eTruck01,15,6,86,44,0).
truckData(eTruck01,15,7,34,16,0).
truckData(eTruck01,15,8,42,13,0).
truckData(eTruck01,15,9,71,35,0).
truckData(eTruck01,15,10,82,36,0).
truckData(eTruck01,15,11,53,25,0).
truckData(eTruck01,15,12,80,38,0).
truckData(eTruck01,15,13,69,18,0).
truckData(eTruck01,15,14,95,45,0).
truckData(eTruck01,15,16,69,29,0).
truckData(eTruck01,15,17,53,17,0).

truckData(eTruck01,16,1,179,68,45).
truckData(eTruck01,16,2,92,37,0).
truckData(eTruck01,16,3,84,31,0).
truckData(eTruck01,16,4,57,16,0).
truckData(eTruck01,16,5,46,18,0).
truckData(eTruck01,16,6,132,60,35).
truckData(eTruck01,16,7,92,42,0).
truckData(eTruck01,16,8,67,23,0).
truckData(eTruck01,16,9,15,3,0).
truckData(eTruck01,16,10,105,46,0).
truckData(eTruck01,16,11,57,28,0).
truckData(eTruck01,16,12,130,52,25).
truckData(eTruck01,16,13,61,15,0).
truckData(eTruck01,16,14,141,61,37).
truckData(eTruck01,16,15,69,29,0).
truckData(eTruck01,16,17,65,24,0).

truckData(eTruck01,17,1,128,46,0).
truckData(eTruck01,17,2,42,14,0).
truckData(eTruck01,17,3,40,11,0).
truckData(eTruck01,17,4,42,13,0).
truckData(eTruck01,17,5,34,10,0).
truckData(eTruck01,17,6,82,38,0).
truckData(eTruck01,17,7,74,30,0).
truckData(eTruck01,17,8,29,6,0).
truckData(eTruck01,17,9,69,31,0).
truckData(eTruck01,17,10,55,24,0).
truckData(eTruck01,17,11,69,29,0).
truckData(eTruck01,17,12,80,30,0).
truckData(eTruck01,17,13,82,23,0).
truckData(eTruck01,17,14,90,38,0).
truckData(eTruck01,17,15,53,18,0).
truckData(eTruck01,17,16,67,25,0).

%warehouseId(<location>,<code>)
warehouseId('Arouca', 1).
warehouseId('Espinho', 2).
warehouseId('Gondomar', 3).
warehouseId('Maia', 4).
warehouseId('Matosinhos', 5).
warehouseId('Oliveira de Azemeis', 6).
warehouseId('Paredes', 7).
warehouseId('Porto', 8).
warehouseId('Povoa de Varzim', 9).
warehouseId('Santa Maria da Feira', 10).
warehouseId('Santo Tirso', 11).
warehouseId('Sao Joao da Madeira', 12).
warehouseId('Trofa', 13).
warehouseId('Vale de Cambra', 14).
warehouseId('Valongo', 15).
warehouseId('Vila do Conde', 16).
warehouseId('Vila Nova de Gaia', 17).

main_warehouse(5).

truck_weight(6).

%delivery(id, date, weight, destWarehouse, timeToLoad, timeToUnload)
%delivery(0,0,0,5,0,0).
delivery(4439, 20221128, 200, 1, 8, 10).
delivery(4446, 20221128, 150, 9, 7, 9).
delivery(4441, 20221128, 100, 3, 5, 7).
delivery(4445, 20221128, 120, 8, 6, 8).
delivery(4448, 20221128, 300, 11, 15, 20).

%delivery(4398, 20221205, 310, 17, 16, 20).
%delivery(4432, 20221205, 270, 14, 14, 18).
%delivery(4437, 20221205, 180, 12, 9, 11).
%delivery(4451, 20221205, 220, 6, 9, 12).
%delivery(4452, 20221205, 390, 13, 21, 26).
%delivery(4444, 20221205, 380, 2, 20, 25).
%delivery(4455, 20221205, 280, 7, 14, 19).
%delivery(4399, 20221205, 260, 15, 13, 18).
%delivery(4454, 20221205, 350, 10, 18, 22).
%delivery(4446, 20221205, 260, 4, 14, 17).
%delivery(4456, 20221205, 330, 16, 17, 21).


% Trucks
% truckFeatures(name, weight(kg), max_load(kg), full_charge(kWh),
% autonomy(km), time_to_charge(from 20% to 80% in minutes)
truckFeatures(eTruck01, 7500, 4300, 80, 48, 60).
%truckFeatures(eTruck02, 7500, 4300, 80, 100, 60).

% Attributes
starting_point(5).

% Weights


sum_weights([],[],0).
sum_weights([City|LW],[WeightAc|LWe],WeightAc):-
    sum_weights(LW,LWe,WeightAc1),delivery(_,_,Weight,City,_,_),WeightAc is Weight+WeightAc1.

% B add_truck_weight

add_truck_weight(TruckWeight,[],[TruckWeight]).
add_truck_weight(TruckWeight,[Weight|LWe],[WeightTruckTotal|LWeT]):-
    add_truck_weight(TruckWeight,LWe,LWeT),
    WeightTruckTotal is Weight+TruckWeight.

smallest_time([Tm],[Wm],Tm,Wm).
smallest_time([H,K|T],[H1,_|T1],Tm,Wm):-
    H =< K,
    smallest_time([H|T],[H1|T1],Tm,Wm).
smallest_time([H,K|T],[_,K1|T1],Tm,Wm):-
    H > K,
    smallest_time([K|T],[K1|T1],Tm,Wm).


get_by_times([],_,[],[],F,F).

get_by_times([],_,Tlist,WList,FList,F):-
    smallest_time(Tlist,WList,_,Wl),
    %truckData(_,W1,W2,Tl,_,_),
    %member(W2, WList),
    del(Wl, WList, WList1),
    FList1 = [Wl|FList],
    get_by_times(WList1,Wl,_,_,FList1,F).


get_by_times([W2|T],W1,TList,WList,FList,F):-
    truckData(_,W1,W2,T1,_,_),
    TList1 = [T1 | TList],
    WList1 = [W2 | WList],
    FList1 = FList,
    get_by_times(T,W1,TList1, WList1, FList1,F).


biggest_load([Tm],[Wm],Tm,Wm).
biggest_load([H,K|T],[H1,_|T1],Tm,Wm):-
    K =< H,
    biggest_load([H|T],[H1|T1],Tm,Wm).
biggest_load([H,K|T],[_,K1|T1],Tm,Wm):-
    K > H,
    biggest_load([K|T],[K1|T1],Tm,Wm).


get_by_weight([],[],F,F).

get_by_weight(WarL,WeightL,WarList,F):-
    biggest_load(WeightL,WarL,Weight1,War1),
    del(War1,WarL,WarL1),
    del(Weight1,WeightL,WeightL1),
    WarList1 = [War1|WarList],
    get_by_weight(WarL1,WeightL1,WarList1,F).


%deletes given item from list
del(X,[X|L_t],L_t).
del(X,[Y|L_t],[Y|L1_t]):-del(X,L_t,L1_t).

%reverses given list
reverse([],Z,Z).
reverse([H|T],Z,Acc) :- reverse(T,Z,[H|Acc]).

calculate_cost(LW,Time,LWCharging):-
    truckFeatures(_,TruckWeight,_,Autonomy1,_,_),
    Autonomy is Autonomy1 * 0.8,
    sum_weights(LW,LWe,_),
    add_truck_weight(TruckWeight,LWe,LWeT),

    %write('Time='),write(Time),nl,

    starting_point(SP),
   % get_all_times(LW,SP,WList),
    append([SP|LW],[SP],LWcomplete),
    cost(LWcomplete,Autonomy,Time,LWCharging,LWeT).

cost([_],_,0,[],[]).
cost([W1,W2|LW],Autonomy,Time,LWCharging,[WT|LWeT]):-
    truckData(_,W1,W2,T,E,_),

    Dist is E * WT / 11800,
    ((Autonomy < Dist,!,truckFeatures(_,_,_,_,A,TCharge),
      A1 is A - Dist,LWCharging = [W1|LWPreviousCharges]);
    (A1 is Autonomy - Dist,
    TCharge is 0,LWCharging = LWPreviousCharges)),

    cost([W2|LW],A1,Time1,LWPreviousCharges,LWeT),
    truckFeatures(_,TruckWeight,MaxLoad,_,_,_),

    %WT1 = new weight of a truck
    %WT = current weight of a truck
    %TruckWeight = weight of a truck
    %MaxLoad = maximum load what truck can carry
    WT1 is WT / (TruckWeight + MaxLoad),

    %Tcharge = time_to_charge retrieved from Truckfeatures
    %Autonomy = current battery load of truck
    %48 is 60% of maxload (80kwh)
    TCharge3 is (TCharge / 48) * (48 - Autonomy),

     starting_point(SP),
    (W2 =\= SP,delivery(_,_,_,W2,_,UnloadTime),
     %Greatest is max(TCharge3,UnloadTime),
     !,
    (Time is T * WT1 + Time1 + TCharge3 + UnloadTime, true);
    (Time is TCharge3 + T * WT1 + Time1,true)).
    %Time is Time2 + UnloadTime.

% B min_time_seq
% LW = List of warehouses
% LCharging = Warehouses where charged
% Time = consumed time
min_time_seq(LW,LCharging,Time):-(run;true),min_time(LW,LCharging,Time).
run:-
    retractall(min_time(_,_,_)),
    assertz(min_time(_,_,100000)),
    %Finds all cities from deliveries and puts those to LWarehouses
    findall(City,delivery(_,_,_,City,_,_),LWarehouses),
    %gets all the possibilities of List
    permutation(LWarehouses,LWPerm),
    calculate_cost(LWPerm,Time,LWCharging),
    update(LWPerm,Time,LWCharging),
    fail.

%this has to be edited
byTimes(_Request):-
    heuristics_by_time(LW,LCharging,Time),
    format('Content-type: text/plain~n~n'),
    format('User registered!~n'),
    format('LW: ~w~nLCharging: ~w~nTime: ~w~n',[LW,LCharging,Time]).

%this has to be edited
byWeight(_Request):-
        heuristics_by_weight(LW,LWCharging,Time),
        prolog_to_json([LW,LWCharging,Time],JSONObject5),
        reply_json(JSONObject5).

heuristics_by_time(LW,LCharging,Time):-(run1;true),min_time(LW,LCharging,Time).
run1:-
    retractall(min_time(_,_,_)),
    assertz(min_time(_,_,100000)),
    %Finds all cities from deliveries and puts those to LWarehouses
    findall(City,delivery(_,_,_,City,_,_),LWarehouses),
    get_by_times(LWarehouses,5,_,_,_,LWPerm1),
    reverse(LWPerm1,LWPerm,[]),!,
    calculate_cost(LWPerm,Time,LWCharging),
    update(LWPerm,Time,LWCharging),
    fail.

heuristics_by_weight(LW,LCharging,Time):-(run2;true),min_time(LW,LCharging,Time).
run2:-
    retractall(min_time(_,_,_)),
    assertz(min_time(_,_,100000)),
    %Finds all cities from deliveries and puts those to LWarehouses
    findall(City,delivery(_,_,_,City,_,_),LWarehouses),
    %Finds all weights from deliveries and puts those to LWeight
    findall(Weight,delivery(_,_,Weight,_,_,_),LWeight),
    get_by_weight(LWarehouses,LWeight,_,LWPerm1),
    reverse(LWPerm1,LWPerm,[]),!,
    calculate_cost(LWPerm,Time,LWCharging),
    update1(LWPerm,Time,LWCharging),
    fail.

update(LWPerm,Time,LWCharging):-
    min_time(_,_,MinTime),
    ((Time < MinTime,!,retract(min_time(_,_,_)),
      assertz(min_time(LWPerm,LWCharging,Time)),
         write('Time='),write(Time),
         write(' '),write(LWPerm),
         write(' with recharges at '),write(LWCharging),nl)
         ;true).

% same as update but this doesnt write anything -- heuristics_by_weight
% uses this now
update1(LWPerm,Time,LWCharging):-
    min_time(_,_,MinTime),
    ((Time < MinTime,!,retract(min_time(_,_,_)),
      assertz(min_time(LWPerm,LWCharging,Time)));
      true).

gen_algo_2_sol(S1,S2):-heuristics_by_time(LW,_,_),S1 = LW, heuristics_by_weight(LW2,_,_), S2 = LW2.

compareTwoListsEqual([],[]).
compareTwoListsEqual([H|T],[H2|T2]):-
    H =:= H2,
    compareTwoListsEqual(T,T2).

% Number of deliveries
deliveries(5).

% Initialize parameters
initialize:-write('Number of new generations: '),read(NG),
    (retract(generations(_));true),assertz(generations(NG)),
    write('Population dimensity: '),read(DP),
    (retract(population(_));true),assertz(population(DP)), % population dimension
    write('Probability of Crossover(%): '),read(P1), % crossover probability
    PC is P1/100,
    (retract(prob_crossover(_));true),assertz(prob_crossover(PC)),
    write('Probablility of Mutation(%): '),read(P2), % mutation probability
    PM is P2/100,
    (retract(prob_mutation(_));true),assertz(prob_mutation(PM)).

generate:-
    initialize,
    generate_population(Pop),
    write('Pop='),write(Pop),nl,
    evaluate_population(Pop,PopEv),
    write('PopEv='),write(PopEv),nl,
	order_population(PopEv,PopOrd),
    generations(NG),!,
    generate_generation(0,NG,PopOrd,[]).

generate_population([LW,LW3|Pop]):-
    population(TamPop),
    deliveries(NumT),
    TamPop1 is TamPop - 2,
    heuristics_by_time(LW,_,_),
    heuristics_by_weight(LW2,_,_),!,
    ((compareTwoListsEqual(LW,LW2),mutation1(LW2,NInd),LW3 = NInd);LW3 = LW2,true),
    findall(WarehouseId,delivery(_,_,_,WarehouseId,_,_),ListTasks),
    generate_population(TamPop1,ListTasks,NumT,Pop,[LW,LW3]).

generate_population(0,_,_,[],_):-!.
generate_population(TamPop,ListTasks,NumT,[Ind|Rest],H):-
    TamPop1 is TamPop - 1,
    generate_population(TamPop1,ListTasks,NumT,Rest,H),
    generate_individual(ListTasks,NumT,Ind),
    not(member(Ind,Rest)),
    not(member(Ind,H)).
generate_population(TamPop,ListTasks,NumT,L,H):-
    generate_population(TamPop,ListTasks,NumT,L,H).

generate_individual([G],1,[G]):-!.
generate_individual(ListTasks,NumT,[G|Rest]):-
    NumTemp is NumT + 1, % to use with random
    random(1,NumTemp,N),
    remove(N,ListTasks,G,NewList),
    NumT1 is NumT - 1,
    generate_individual(NewList,NumT1,Rest).

remove(1,[G|Rest],G,Rest).
remove(N,[G1|Rest],G,[G1|Rest1]):-N1 is N - 1,
    remove(N1,Rest,G,Rest1).

evaluate_population([],[]).
evaluate_population([Ind|Rest],[Ind*Time|Rest1]):-
    calculate_cost(Ind,Time,_),
    evaluate_population(Rest,Rest1).

order_population(PopEv,PopEvOrd):-
    bsort(PopEv,PopEvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
    bsort(Xs,Zs),
    bexchange([X|Zs],Ys).

bexchange([X],[X]):-!.
bexchange([X*VX,Y*VY|L1],[Y*VY|L2]):-
    VX > VY,!,
    bexchange([X*VX|L1],L2).

bexchange([X|L1],[X|L2]):-bexchange(L1,L2).

generate_generation(G,G,Pop,_):-!,
    write('Generation '),write(G),write(':'),nl,write(Pop),nl.
generate_generation(N,G,Pop,PGen):-
    write('Generation '),write(N),write(':'),nl,write(Pop),nl,
    append(PGen,[Pop],PGen2),
    ((is_stable(PGen2),true);
    (random_permutation(Pop,LRP),
    crossover(LRP,NPop1),
    mutation(NPop1,NPop),
    evaluate_population(NPop,NPopEv),
    order_population(NPopEv,NPopOrd),
    N1 is N + 1,
    generate_generation(N1,G,NPopOrd,PGen2))).

% Is stabilized when the last populations are 10 times the same 
is_stable(Generations) :-
    length(Generations, N),
    N >= 10,
    reverse(Generations, ReversedGenerations),
    is_stable(ReversedGenerations, 10).

is_stable(_, 0).
is_stable([Generation|Tail], NumGenerations) :-
    is_same_gen(Generation, Tail, NumGenerations),!.

is_same_gen(_,_,1).
is_same_gen(Generation, [OtherGeneration|Tail],NumGenerations) :-
    compare_gen(Generation, OtherGeneration),
    NumGen2 is NumGenerations - 1,
    is_same_gen(Generation, Tail, NumGen2).

compare_gen([], []).
compare_gen([H1|T1], [H2|T2]) :-
    H1 == H2,
    compare_gen(T1, T2).

generate_crossover_points(P1,P2):-generate_crossover_points1(P1,P2).
generate_crossover_points1(P1,P2):-
    deliveries(N),
    NTemp is N + 1,
    random(1,NTemp,P11),
    random(1,NTemp,P21),
    P11 \== P21,!,
    ((P11 < P21,!,P1 = P11,P2 = P21);P1 = P21,P2 = P11).
generate_crossover_points1(P1,P2):-
    generate_crossover_points1(P1,P2).

crossover([],[]).
crossover([Ind*_],[Ind]).
crossover([Ind1*_,Ind2*_|Rest],[NInd1,NInd2|Rest1]):-
    generate_crossover_points(P1,P2),
    prob_crossover(Pcross),random(0.0,1.0,Pc),
    ((Pc =< Pcross,!,
  crosses(Ind1,Ind2,P1,P2,NInd1),
      crosses(Ind2,Ind1,P1,P2,NInd2));
      (NInd1 = Ind1,NInd2 = Ind2)),
      crossover(Rest,Rest1).

preencheh([],[]).
preencheh([_|R1],[h|R2]):-
    preencheh(R1,R2).

sublist(L1,I1,I2,L):-I1 < I2,!,
    sublist1(L1,I1,I2,L).
sublist(L1,I1,I2,L):-sublist1(L1,I2,I1,L).

sublist1([X|R1],1,1,[X|H]):-!,preencheh(R1,H).
sublist1([X|R1],1,N2,[X|R2]):-!,N3 is N2 - 1,
    sublist1(R1,1,N3,R2).
sublist1([_|R1],N1,N2,[h|R2]):-N3 is N1 - 1,
    N4 is N2 - 1,
    sublist1(R1,N3,N4,R2).

rotate_right(L,K,L1):-deliveries(N),
    T is N - K,
    rr(T,L,L1).

rr(0,L,L):-!.
rr(N,[X|R],R2):-N1 is N - 1,
    append(R,[X],R1),
    rr(N1,R1,R2).

eliminate([],_,[]):-!.
eliminate([X|R1],L,[X|R2]):-not(member(X,L)),!,
    eliminate(R1,L,R2).
eliminate([_|R1],L,R2):-
    eliminate(R1,L,R2).

insert([],L,_,L):-!.
insert([X|R],L,N,L2):-
    deliveries(T),
    ((N > T,!,N1 is N mod T);N1 = N),
    insert1(X,N1,L,L1),
    N2 is N + 1,
    insert(R,L1,N2,L2).

insert1(X,1,L,[X|L]):-!.
insert1(X,N,[Y|L],[Y|L1]):-
    N1 is N - 1,
    insert1(X,N1,L,L1).

crosses(Ind1,Ind2,P1,P2,NInd11):-
    sublist(Ind1,P1,P2,Sub1),
    deliveries(NumT),
    R is NumT - P2,
    rotate_right(Ind2,R,Ind21),
    eliminate(Ind21,Sub1,Sub2),
    P3 is P2 + 1,
    insert(Sub2,Sub1,P3,NInd1),
    eliminateh(NInd1,NInd11).

eliminateh([],[]).
eliminateh([h|R1],R2):-!,
    eliminateh(R1,R2).
eliminateh([X|R1],[X|R2]):-
    eliminateh(R1,R2).

mutation([],[]).
mutation([Ind|Rest],[NInd|Rest1]):-
    prob_mutation(Pmut),
    random(0.0,1.0,Pm),
    ((Pm < Pmut,!,mutation1(Ind,NInd));NInd = Ind),
    mutation(Rest,Rest1).

mutation1(Ind,NInd):-
    generate_crossover_points(P1,P2),
    mutation22(Ind,P1,P2,NInd).

mutation22([G1|Ind],1,P2,[G2|NInd]):-!,
    P21 is P2 - 1,
    mutation23(G1,P21,Ind,G2,NInd).
mutation22([G|Ind],P1,P2,[G|NInd]):-
    P11 is P1 - 1, P21 is P2 - 1,
    mutation22(Ind,P11,P21,NInd).

mutation23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutation23(G1,P,[G|Ind],G2,[G|NInd]):-
    P1 is P - 1,
    mutation23(G1,P1,Ind,G2,NInd).
